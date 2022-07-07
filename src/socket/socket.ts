import MysqlDataSource from "../connection/conn";
import { MinigameSnowboardHero } from "../entity/MinigameSnowboardHero";
import { decodeJWT } from "../helpers/jwt";
import { getUserStatusGameSnowBoardHero, getUserToken, updateUserStatusGameSnowBoardHero } from "../helpers/redis";
import { postRequest } from "../helpers/request";
import { baseGameConfig, baseGameConfigPVP, copyObjectValue, distance2, distanceBetweenCir, errorHandlerTask, getCurrentTime, getRandomArrElement, initClientDataCustom } from "../utils/utils";
import { v4 as uuidv4 } from 'uuid'
import { snowboardHero } from "../app";

const countDownObjSingle = {}
const countDownObjMulti = {}

var queue = [];    // list of sockets waiting for peers
var allUsers = []; // map socket.id => socket
var rooms = {};    // map socket.id => room

const findPeerForLoneSocket = (socket) => {
  if (queue.length > 0) {
    var peer = queue.find(item => item.betValue === socket.betValue && item.id !== socket.id);
    if (peer) {
      queue = queue.filter(item => (item.id !== peer.id) && (item.id !== socket.id))
      var room = socket.id + '#' + peer.id;
      allUsers[peer.id].join(room);
      socket.join(room);
      rooms[peer.id] = room;
      rooms[socket.id] = room;
      allUsers[peer.id].emit('match-room', { 'name': allUsers[socket.id].userInfo.name, 'room': room });
      socket.emit('match-room', { 'name': allUsers[peer.id].userInfo.name, 'room': room });
      setTimeout(() => {
        //player1
        countDownObjMulti[room] = {}
        countDownObjMulti[room].player1 = {}
        countDownObjMulti[room].player1.socketObj = socket
        countDownObjMulti[room].player1.game = copyObjectValue(baseGameConfig)
        countDownObjMulti[room].player1.game.lastHeartBeat = getCurrentTime()
        countDownObjMulti[room].player1.game.start_at = getCurrentTime()

        //player2
        countDownObjMulti[room].player2 = {}
        countDownObjMulti[room].player2.socketObj = allUsers[peer.id]
        countDownObjMulti[room].player2.game = copyObjectValue(baseGameConfig)
        countDownObjMulti[room].player2.game.lastHeartBeat = getCurrentTime()
        countDownObjMulti[room].player2.game.start_at = getCurrentTime()
        //game
        countDownObjMulti[room].gameState = 1
        countDownObjMulti[room].game = copyObjectValue(baseGameConfigPVP)
        countDownObjMulti[room].game.betHCoin = socket.betValue
      }, 3000)
    }
  }
}

export const sushiGameSocket = (nspSocket) => {
  nspSocket.use(async (socket, next) => {
    try {
      const { token } = socket.handshake.query;
      if (!token) return next(new Error("Not auth"))
      const decode: any = decodeJWT(token)
      if (!decode) return next(new Error("Not auth"))
      // const tokenCurr = await getUserToken(decode.id)
      // if (tokenCurr !== token) return next(new Error("Not auth"))

      const userData = await postRequest('/user/info', { id: decode.id })
      if (!userData || userData.errorStatus === 1) return new Error("không xác thực user")
      const infoGame = await postRequest('/game/info', { username: userData.username })
      socket.userId = userData.id
      socket.gameInfo = infoGame
      socket.next = next
      socket.userInfo = {
        "id": userData.id,
        "turn": infoGame.turn,
        "hCoin": infoGame.hCoin,
        "name": userData.username,
        "avatar": "http://cdn-dev.ugame.vn/srcpen/Sprite/OBJ/Layer%201.png?v=1",
      };
      const checkStatus = await getUserStatusGameSnowBoardHero(userData.id)
      if(checkStatus === "online") {
        return next(new Error("Tài khoản này đã online ở 1 nơi khác"))
      }
      await updateUserStatusGameSnowBoardHero(userData.id, "online")
      if (!socket.userId) throw new Error("không xác thực user")
      return next();
    } catch (error) {
      return next(new Error(error));
    }
  });

  nspSocket.on("connection", socket => {
    socket.on('init-data', async (elmId, callback) => {
      try {
        if (!callback) {
          return;
        }
        return callback(null, {
          userData: socket.userInfo,
          gameConfig: initClientDataCustom
        })
      } catch (error) {
        console.log(error)
        socket.next(new Error("Hệ thống bận"))
        // socket.emit('errorSocket', { type: 'onElm', message: 'onElm fail' })
      }
    });

    //chơi game
    socket.on('play', async (data, callback) => {
      try {
        const validTypes = ['SINGLE', 'MULTI']
        if (!data || !data.type || !validTypes.includes(data.type)) return socket.next(new Error("Dữ liệu sai"))
        if (data.type === "SINGLE") {
          if (socket.userInfo.turn <= 0) return socket.next(new Error("Lượt chơi đã hết"))
          setTimeout(() => {
            socket.userInfo.turn--;
            const userRepo = MysqlDataSource.getRepository(MinigameSnowboardHero)
            userRepo.decrement({ id: socket.gameInfo.id }, 'turn', 1)

            socket.game = copyObjectValue(baseGameConfig);
            socket.game.lastHeartBeat = getCurrentTime();
            socket.game.start_at = getCurrentTime();

            countDownObjSingle[socket.id] = {};
            countDownObjSingle[socket.id].gameState = 1;
            countDownObjSingle[socket.id].socketObj = socket;
          }, 3000)
        }

        if (data.type === "MULTI") {
          const betTypes = [5, 10, 15, 50, 100]
          if (!data.betHCoin || !Number.isInteger(data.betHCoin) || !betTypes.includes(data.betHCoin)) return socket.next(new Error("Dữ liệu sai"))
          if(socket.userInfo.hCoin < data.betHCoin) return socket.next(new Error("Bạn không đủ hCoin"))
          if (!socket.isInRoomPvp) {
            socket.betValue = data.betHCoin
            socket.isInRoomPvp = true
            allUsers[socket.id] = socket;

            queue.push({ id: socket.id, betValue: socket.betValue });
            findPeerForLoneSocket(socket);
          } else {
            return socket.next(new Error("Bạn đang trong phòng rồi"))
          }
        }
        return callback(null, { gameData: socket.game });
      } catch (error) {
        console.log(error);
        socket.next(new Error("Hệ thống bận"))
        // socket.emit('errorSocket', { type: 'onElm', message: 'onElm fail' })
      }
    });

    //replay only for pvp
    socket.on('replay', async (data, callback) => {
      try {
        if(!socket.isInRoomPvp) return socket.next(new Error("Dữ liệu sai"))
        var room = rooms[socket.id]
        if (!room) return socket.next(new Error("Dữ liệu sai"))
        if(socket.userInfo.hCoin < socket.betValue) return socket.next(new Error("Bạn không đủ hCoin"))
        var peerID = room.split('#');
        peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
        if(allUsers[peerID].isReplay === 1) {
          allUsers[peerID].emit('match-room', { 'name': allUsers[socket.id].userInfo.name, 'room': room });
          socket.emit('match-room', { 'name': allUsers[peerID].userInfo.name, 'room': room });
          setTimeout(() => {
            //player1
            countDownObjMulti[room] = {}
            countDownObjMulti[room].player1 = {}
            countDownObjMulti[room].player1.socketObj = socket
            countDownObjMulti[room].player1.game = copyObjectValue(baseGameConfig)
            countDownObjMulti[room].player1.game.lastHeartBeat = getCurrentTime()
            countDownObjMulti[room].player1.game.start_at = getCurrentTime()
    
            //player2
            countDownObjMulti[room].player2 = {}
            countDownObjMulti[room].player2.socketObj = allUsers[peerID]
            countDownObjMulti[room].player2.game = copyObjectValue(baseGameConfig)
            countDownObjMulti[room].player2.game.lastHeartBeat = getCurrentTime()
            countDownObjMulti[room].player2.game.start_at = getCurrentTime()
            //game
            countDownObjMulti[room].gameState = 1
            countDownObjMulti[room].game = copyObjectValue(baseGameConfigPVP)
            countDownObjMulti[room].game.betHCoin = socket.betValue
          }, 3000)
          allUsers[peerID].isReplay = socket.isReplay = 0
        } else {
          allUsers[peerID].emit("replay", { mess: "Đối thủ yêu cầu chơi lại" })
          socket.isReplay = 1
        }
        return callback(null, { gameData: socket.game });
      } catch (error) {
        console.log(error);
        socket.next(new Error("Hệ thống bận"))
        // socket.emit('errorSocket', { type: 'onElm', message: 'onElm fail' })
      }
    });

    socket.on("move-player", async (data, callback) => {
      try {
        if (!callback) return;
        const validTypes = ['SINGLE', 'MULTI']
        if (!data || !data.pos || !data.type || !validTypes.includes(data.type)) return socket.next(new Error("dữ liệu sai"))
        if (
          data.pos.length !== 8 ||
          data.pos[0].length !== 2 ||
          data.pos[1].length !== 2 ||
          data.pos[2].length !== 2 ||
          data.pos[3].length !== 2 ||
          data.pos[4].length !== 2 ||
          data.pos[5].length !== 2 ||
          data.pos[6].length !== 2 ||
          data.pos[7].length !== 2
        )
          return socket.next(new Error("dữ liệu sai"))
        const check = data.pos.find(item => {
          return (!Number.isInteger(item[0]) || !Number.isInteger(item[1]))
        })
        if (check) return socket.next(new Error("dữ liệu sai"))

        if (data.type === "SINGLE") {
          if (!socket.game) return socket.next(new Error("game chưa bắt đầu"))
          for (const [key, item] of Object.entries(data.pos)) {
            socket.game.pos[key] = item
          }
          return callback(null, { gameData: socket.game })
        }
        if (data.type === "MULTI") {
          var room = rooms[socket.id]
          if (!room) return socket.next(new Error("dữ liệu sai"))
          if (!countDownObjMulti[room]) return socket.next(new Error("dữ liệu sai"))
          if (countDownObjMulti[room].player1.socketObj.id === socket.id) {
            for (const [key, item] of Object.entries(data.pos)) {
              countDownObjMulti[room].player1.game.pos[key] = item
            }
          }
          if (countDownObjMulti[room].player2.socketObj.id === socket.id) {
            for (const [key, item] of Object.entries(data.pos)) {
              countDownObjMulti[room].player2.game.pos[key] = item
            }
          }
          const dataLoad = {
            game: countDownObjMulti[room].game,
            player1: countDownObjMulti[room].player1.game,
            player2: countDownObjMulti[room].player2.game,
          }
          return callback(null, { gameData: dataLoad })
        }
      } catch (error) {
        console.log(error)
        socket.next(new Error("Hệ thống bận"))
        // socket.emit('errorSocket', { type: 'onElm', message: 'onElm fail' })
      }
    })


    socket.on('disconnect', async () => {
      await updateUserStatusGameSnowBoardHero(socket.userInfo.id, "offline")
      // if (socket.isInRoomPvp === 0) return socket.next(new Error("Bạn đã out rồi"))
      var room = rooms[socket.id];
      if (room) {
        // socket.broadcast.to(room).emit('chat end');
        var peerID = room.split('#');
        peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
        if(countDownObjMulti[room]) {
          postRequest('/gamePvp/update', {
            username: allUsers[peerID].userInfo.name,
            hCoin: countDownObjMulti[room].game.betHCoin,
            status: 0,
          })
          postRequest('/gamePvp/update', {
            username: socket.userInfo.name,
            hCoin: countDownObjMulti[room].game.betHCoin,
            status: 1,
          })
        }
        allUsers[peerID].emit("end-game", { status: true, mess: "Đối thủ đã bỏ cuộc" })
        allUsers[peerID].leave(room)
        socket.leave(room)
        delete countDownObjMulti[room]
      }
      queue = queue.filter(item => item.id !== socket.id)
      allUsers = allUsers.filter(item => item.id !== socket.id)
      socket.isInRoomPvp = 0
      socket.isReplay = 0
    });

    socket.on('out-room', async () => {
      if (socket.isInRoomPvp === 0) return socket.next(new Error("Bạn đã out rồi"))
      var room = rooms[socket.id]
      if (room) {
        // socket.broadcast.to(room).emit('chat end');
        var peerID = room.split('#');
        peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
        if(countDownObjMulti[room]) {
          postRequest('/gamePvp/update', {
            username: allUsers[peerID].userInfo.name,
            hCoin: countDownObjMulti[room].game.betHCoin,
            status: 0,
          })
          postRequest('/gamePvp/update', {
            username: socket.userInfo.name,
            hCoin: countDownObjMulti[room].game.betHCoin,
            status: 1,
          })
        }
        allUsers[peerID].emit("end-game", { status: true, mess: "Đối thủ đã bỏ cuộc" })
        allUsers[peerID].leave(room)
        socket.leave(room)
        delete countDownObjMulti[room]
      }
      queue = queue.filter(item => item.id !== socket.id)
      allUsers = allUsers.filter(item => item.id !== socket.id)
      socket.isInRoomPvp = 0
      socket.isReplay = 0
    });

    //ping check đứt kết nối
    socket.on("heartbeat", async () => {
      try {
        const task = () => {
          if (socket.game) {
            socket.game.lastHeartBeat = new Date().getTime();
          }
        }
        return errorHandlerTask(task, task);
      } catch (error) {
        console.log(error)
        socket.next(new Error("Hệ thống bận"))
      }
    });

    socket.on('pause-game', async () => {
      try {
        console.log("PAUSE GAME");
        countDownObjSingle[socket.id].gameState = (countDownObjSingle[socket.id].gameState) ? 0 : 1;
      } catch (error) {
        console.log(error)
        socket.next(new Error("Hệ thống bận"))
      }
    });

    socket.on('out-game', async () => {
      try {
        delete countDownObjSingle[socket.id]
      } catch (error) {
        console.log(error)
        socket.next(new Error("Hệ thống bận"))
      }
    });

    // socket.on("disconnect", async () => {
    //   console.log(socket)
    //   console.log(`Player ${socket.id} temporarily disconnected!`);
    // });

    // socket.on('resume-game', async () => {
    //   try {
    //     console.log("RESUME GAME");
    //     socket.emit('resume-game-res', { data: countDownObjSingle })
    //   } catch (error) {
    //     console.log(error)
    //     socket.next(new Error("Hệ thống bận"))
    //   }
    // });
  })
}

//pve
setInterval(() => {
  // tạo ra enemy
  for (const socketId in countDownObjSingle) {
    if (countDownObjSingle[socketId] && countDownObjSingle[socketId].gameState === 1) {
      const newEnemy = copyObjectValue(getRandomArrElement(initClientDataCustom.parameter_game.listObstacle))
      if (newEnemy.pos) {
        newEnemy.id = uuidv4()
        newEnemy.speed = countDownObjSingle[socketId].socketObj.game.speed
        countDownObjSingle[socketId].socketObj.game.listObstacle.push(newEnemy)
        countDownObjSingle[socketId].socketObj.emit("load-item", { data: newEnemy })
      }
    }
  }
}, initClientDataCustom.parameter_game.timeCreateEnemy);

setInterval(() => {
  // tạo ra hCoin
  for (const socketId in countDownObjSingle) {
    if (countDownObjSingle[socketId] && countDownObjSingle[socketId].gameState === 1) {
      const newHCoin = copyObjectValue(getRandomArrElement(initClientDataCustom.parameter_game.listHCoin))
      if (newHCoin.pos) {
        newHCoin.id = uuidv4()
        newHCoin.speed = countDownObjSingle[socketId].socketObj.game.speed
        countDownObjSingle[socketId].socketObj.game.listHCoin.push(newHCoin)
        countDownObjSingle[socketId].socketObj.emit("load-item", { data: newHCoin })
      }
    }
  }
}, initClientDataCustom.parameter_game.timeCreateHCoin);

setInterval(() => {
  // tạo ra skill
  for (const socketId in countDownObjSingle) {
    if (countDownObjSingle[socketId] && countDownObjSingle[socketId].gameState === 1) {
      const newSkill = copyObjectValue(getRandomArrElement(initClientDataCustom.parameter_game.listSkill))
      if (newSkill.pos) {
        newSkill.id = uuidv4()
        newSkill.speed = countDownObjSingle[socketId].socketObj.game.speed
        countDownObjSingle[socketId].socketObj.game.listSkill.push(newSkill)
        countDownObjSingle[socketId].socketObj.emit("load-item", { data: newSkill })
      }
    }
  }
}, initClientDataCustom.parameter_game.timeCreateSkill);

setInterval(() => {
  // cộng điểm
  for (const socketId in countDownObjSingle) {
    if (countDownObjSingle[socketId] && countDownObjSingle[socketId].gameState === 1) {
      countDownObjSingle[socketId].socketObj.game.point += 1
    }
  }
}, 1000);

setInterval(() => {
  // add speed
  for (const socketId in countDownObjSingle) {
    if (countDownObjSingle[socketId] && countDownObjSingle[socketId].gameState === 1) {
      countDownObjSingle[socketId].socketObj.game.speed += 3
    }
  }
}, 30000);

setInterval(() => {
  // update game socket single
  for (const socketId in countDownObjSingle) {
    if (countDownObjSingle[socketId] && countDownObjSingle[socketId].gameState === 1) {
      let checkEndGame = false
      let checkClaimHCoin = false
      let checkClaimHSkill = false
      //obstacle
      countDownObjSingle[socketId].socketObj.game.listObstacle = countDownObjSingle[socketId].socketObj.game.listObstacle.map(item => {
        item.pos[1] += countDownObjSingle[socketId].socketObj.game.speed
        const disRadius = distanceBetweenCir(0, item.radius)
        for (const [key, itemPos] of Object.entries(countDownObjSingle[socketId].socketObj.game.pos)) {
          let dis = distance2(item.pos, itemPos)
          if(dis <= disRadius) checkEndGame = true
        }
        return item
      })
      countDownObjSingle[socketId].socketObj.game.listObstacle = countDownObjSingle[socketId].socketObj.game.listObstacle.filter(item => item.pos[1] < 100)
      //hcoin
      countDownObjSingle[socketId].socketObj.game.listHCoin = countDownObjSingle[socketId].socketObj.game.listHCoin.map(item => {
        item.pos[1] += countDownObjSingle[socketId].socketObj.game.speed
        const disRadius = distanceBetweenCir(0, item.radius)
        for (const [key, itemPos] of Object.entries(countDownObjSingle[socketId].socketObj.game.pos)) {
          let dis = distance2(item.pos, itemPos)
          if(dis <= disRadius) {
            checkClaimHCoin = true
          }
        }
        if (checkClaimHCoin && item.isShow) {
          countDownObjSingle[socketId].socketObj.game.hCoin += 1
          item.isShow = 0
        }
        return item
      })
      countDownObjSingle[socketId].socketObj.game.listHCoin = countDownObjSingle[socketId].socketObj.game.listHCoin.filter(item => item.pos[1] < 100 && item.isShow === 0)
      //skill
      countDownObjSingle[socketId].socketObj.game.listSkill = countDownObjSingle[socketId].socketObj.game.listSkill.map(item => {
        item.pos[1] += countDownObjSingle[socketId].socketObj.game.speed
        const disRadius = distanceBetweenCir(0, item.radius)
        for (const [key, itemPos] of Object.entries(countDownObjSingle[socketId].socketObj.game.pos)) {
          let dis = distance2(item.pos, itemPos)
          if(dis <= disRadius) {
            checkClaimHSkill = true
          }
        }
        if (checkClaimHSkill && item.isShow) {
          countDownObjSingle[socketId].socketObj.game.speed -= 1
          item.isShow = 0
        }
        return item
      })
      countDownObjSingle[socketId].socketObj.game.listSkill = countDownObjSingle[socketId].socketObj.game.listSkill.filter(item => item.pos[1] < 100 && item.isShow === 0)
      //load game
      countDownObjSingle[socketId].socketObj.emit("load-game", { data: countDownObjSingle[socketId].socketObj.game })
      if (checkEndGame) {
        countDownObjSingle[socketId].socketObj.emit("end-game", { data: countDownObjSingle[socketId].socketObj.game })
        countDownObjSingle[socketId].socketObj.userInfo.hCoin += countDownObjSingle[socketId].socketObj.game.hCoin
        postRequest('/game/update', {
          id: countDownObjSingle[socketId].socketObj.gameInfo.id,
          hCoin: countDownObjSingle[socketId].socketObj.game.hCoin,
          point: countDownObjSingle[socketId].socketObj.game.point,
        })
        delete countDownObjSingle[socketId]
      }
    }
  }
}, 1000 / 60);


// pvp
setInterval(() => {
  // tạo ra enemy
  for (const socketId in countDownObjMulti) {
    if (countDownObjMulti[socketId] && countDownObjMulti[socketId].gameState === 1) {
      const newEnemy = copyObjectValue(getRandomArrElement(initClientDataCustom.parameter_game.listObstacle))
      if (newEnemy.pos) {
        newEnemy.speed = countDownObjMulti[socketId].game.speed
        countDownObjMulti[socketId].game.listObstacle.push(newEnemy)
      }
    }
  }
}, initClientDataCustom.parameter_game.timeCreateEnemy);

// setInterval(() => {
//   // tạo ra skill
//   for (const socketId in countDownObjMulti) {
//     if (countDownObjMulti[socketId] && countDownObjMulti[socketId].gameState === 1) {
//       const newSkill = copyObjectValue(getRandomArrElement(initClientDataCustom.parameter_game.listSkill))
//       if (newSkill.pos) {
//         newSkill.speed = countDownObjMulti[socketId].socketObj.game.speed
//         countDownObjMulti[socketId].socketObj.game.listSkill.push(newSkill)
//       }
//     }
//   }
// }, initClientDataCustom.parameter_game.timeCreateSkill);

setInterval(() => {
  // update game socket multi
  for (const socketId in countDownObjMulti) {
    if (countDownObjMulti[socketId] && countDownObjMulti[socketId].gameState === 1) {
      let checkEndGame1 = false
      let checkEndGame2 = false
      countDownObjMulti[socketId].game.listObstacle = countDownObjMulti[socketId].game.listObstacle.map(item => {
        item.pos[1] += countDownObjMulti[socketId].game.speed
        const disRadius = distanceBetweenCir(0, item.radius)
        for (const [key, itemPos] of Object.entries(countDownObjMulti[socketId].player1.game.pos)) {
          let dis = distance2(item.pos, itemPos)
          if(dis <= disRadius) checkEndGame1 = true
        }
        for (const [key, itemPos] of Object.entries(countDownObjMulti[socketId].player2.game.pos)) {
          let dis = distance2(item.pos, itemPos)
          if(dis <= disRadius) checkEndGame2 = true
        }
        return item
      })
      countDownObjMulti[socketId].game.listObstacle = countDownObjMulti[socketId].game.listObstacle.filter(item => item.pos[1] < 100)
      // countDownObjMulti[socketId].socketObj.game.listSkill = countDownObjMulti[socketId].socketObj.game.listSkill.filter(item => item.pos[1] < 100)
      // countDownObjMulti[socketId].socketObj.game.listSkill = countDownObjMulti[socketId].socketObj.game.listSkill.map(item => {
      //   item.pos[1] += countDownObjMulti[socketId].socketObj.game.speed
      //   const distance = Math.sqrt(Math.pow((item.pos[0] - countDownObjMulti[socketId].socketObj.game.pos[0]), 2) + Math.pow((item.pos[1] - countDownObjMulti[socketId].socketObj.game.pos[1]), 2))
      //   if (distance < (countDownObjMulti[socketId].socketObj.game.radius + item.radius)) {
      //     countDownObjMulti[socketId].socketObj.game.speed -= 3
      //   }
      //   return item
      // })
      const dataLoad = {
        game: countDownObjMulti[socketId].game,
        player1: countDownObjMulti[socketId].player1.game,
        player2: countDownObjMulti[socketId].player2.game,
      }
      snowboardHero.to(socketId).emit('load-game', { data: dataLoad })
      if (checkEndGame1 || checkEndGame2) {
        if( checkEndGame1 && checkEndGame2 ) {
          snowboardHero.to(socketId).emit('end-game', { data: dataLoad, status: false, mess: "you draw" })
        } else if (checkEndGame1 && !checkEndGame2) {
          countDownObjMulti[socketId].player1.socketObj.emit("end-game", { data: dataLoad, status: false, mess: "you lose"  })
          countDownObjMulti[socketId].player2.socketObj.emit("end-game", { data: dataLoad, status: true, mess: "you win" })
          postRequest('/gamePvp/update', {
            username: countDownObjMulti[socketId].player1.socketObj.userInfo.name,
            hCoin: countDownObjMulti[socketId].game.betHCoin,
            status: 0,
          })
          postRequest('/gamePvp/update', {
            username: countDownObjMulti[socketId].player2.socketObj.userInfo.name,
            hCoin: countDownObjMulti[socketId].game.betHCoin,
            status: 1,
          })
        } else if (!checkEndGame1 && checkEndGame2) {
          countDownObjMulti[socketId].player2.socketObj.emit("end-game", { data: dataLoad, status: false, mess: "you lose"  })
          countDownObjMulti[socketId].player1.socketObj.emit("end-game", { data: dataLoad, status: true, mess: "you win" })
          postRequest('/gamePvp/update', {
            username: countDownObjMulti[socketId].player1.socketObj.userInfo.name,
            hCoin: countDownObjMulti[socketId].game.betHCoin,
            status: 1,
          })
          postRequest('/gamePvp/update', {
            username: countDownObjMulti[socketId].player2.socketObj.userInfo.name,
            hCoin: countDownObjMulti[socketId].game.betHCoin,
            status: 0,
          })
        }
        delete countDownObjMulti[socketId]
      }
    }
  }
}, 1000 / 60);
