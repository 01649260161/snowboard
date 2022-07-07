const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });
const { token } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io('/snowboard-hero', {
  query: {
    "token": token
  }
});

document.getElementById('init-data').addEventListener('click', () => {
  socket.emit("init-data", {}, (response, infoUser) => {
    // console.log(response, bb); // ok
  });
});

document.getElementById('play').addEventListener('click', () => {
  socket.emit("play", { type: "SINGLE", betHCoin: 15 }, (response) => {
    console.log(response); // ok
  });
});

document.getElementById('replay').addEventListener('click', () => {
  socket.emit("replay", { }, (response) => {
    console.log(response); // ok
  });
});

document.getElementById('move-player').addEventListener('click', () => {
  socket.emit("move-player", { type: "SINGLE", pos: [[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0]] }, (response) => {
    console.log(response); // ok
  });
});

document.getElementById('out-room').addEventListener('click', () => {
  socket.emit('out-room', { }, (response) => {
    console.log(response); // ok
  });
});

// document.getElementById('heartbeat').addEventListener('click', () => {
//   socket.emit('heartbeat', {}, (response) => {
//     console.log(response); // ok
//   });
// });

// document.getElementById('pause-game').addEventListener('click', () => {
//   socket.emit('pause-game', {});
// });

// document.getElementById('resume-game').addEventListener('click', () => {
//   socket.emit('resume-game', {});
// });

// document.getElementById('out-game').addEventListener('click', () => {
//   socket.emit('out-game', {});
// });

// document.getElementById('init-data').addEventListener('click', () => {
//   socket.emit('init-data', {});
// });

// document.getElementById('hello').addEventListener('click', () => {
//   socket.emit('hello', {}, (response, bb) => {

//   });
// });

// document.getElementById('check-room').addEventListener('click', () => {
//   socket.emit('check-room', {}, (response, bb) => {

//   });
// });

// socket.on('errorSocket', ({ type, message }) => {
//   console.log(`errorSocket: `, type, message)
// });

// socket.on('timeCountDown', ({ data }) => {
//   console.log(`timeCountDown: `, data)
// });

// socket.on('timeup', ({ data }) => {
//   console.log(`timeup: `, data)
// });

// socket.on('newEnemy', ({ data }) => {
//   console.log(`newEnemy: `, data)
// });

// socket.on('resume-game-res', ({ data }) => {
//   console.log(`resume-game-res: `, data)
// });

// socket.on('hello', (data) => {
//   console.log(`hello: `, data)
// });

// socket.on('error', (data) => {
//   console.log(`error: `, data)
// });

socket.on("connect_error", (err) => {
  console.log(err instanceof Error); // true
  console.log(err.message); // not authorized
  console.log(err.data); // { content: "Please retry later" }
});

socket.on('chat start', (data) => {
  console.log(`chat start: `, data)
});


// socket.on('end-game', (data) => {
//   console.log(`end-game: `, data)
// });

{/* <div class="">
<button id="chat start">chat start</button>
</div>

<div class="">
<button id="chat end">chat end</button>
</div>

<div class="">
<button id="disconnect">disconnect</button>
</div> */}

const username = "HienTm"
socket.on('connect', function (data) { // we are connected, should send our name
  connected = true;
  if (username) socket.emit('login', { 'username': username });
});
socket.on('chat start', function (data) {
  console.log(data)
});
socket.on('chat end', function (data) {
  console.log(data)
});
socket.on('disconnect', function (data) { // handle server/connection falling
  console.log('Connection fell or your browser is closing.');
});