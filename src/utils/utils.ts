
export const initClientData = {
  "sprite": {
    "menu": {
      "srcImgBG": "http://cdn-dev.ugame.vn/srcsushi/sprite/BACKGROUND.png",
      "srcImgLogo": "http://cdn-dev.ugame.vn/srcsushi/sprite/TITTLE.png",
      "srcImgBtnPlay": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_PLAY.png",
      "srcImgBtnPlayInPopupPause": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_PLAY.png",
      "srcImgBtnTheLe": "http://cdn-dev.ugame.vn/srcsushi/sprite/B_LEFT.png",
      "srcImgBtnPhanThuong": "http://cdn-dev.ugame.vn/srcsushi/sprite/B_RIGHT.png"
    },
    "game": {
      "srcImgHeart": "http://cdn-dev.ugame.vn/srcsushi/sprite/Avatar.png",
      "srcImgArrow": "http://cdn-dev.ugame.vn/srcsushi/sprite/Avatar.png",
      "srcImgBG": "http://cdn-dev.ugame.vn/srcsushi/sprite/BACKGROUND.png",
      "srcImgBottomBG": "http://cdn-dev.ugame.vn/srcsushi/sprite/BACKGROUND.png",
      "srcImgRectangle": "http://cdn-dev.ugame.vn/srcsushi/sprite/Rectangle%201.png",
      "srcImgBtnPlayInPopupPause": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_PLAY.png",
      "srcImgBtnPause": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_PAUSE.png",
      "srcImgBGInPopupGameOver1": "http://cdn-dev.ugame.vn/srcsushi/sprite/GAMEOVER.png",
      "srcImgBGInPopupGameOver2": "http://cdn-dev.ugame.vn/srcsushi/sprite/GAMEOVER.png",
      "srcImgBtnPlayAgainInPopupGameOver1": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_AGAIN.png",
      "srcImgBtnCloseAgainInPopupGameOver2": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_AGAIN.png",
      "srcImgClosePopupMenu": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_CLOSE.png",

      "spriteLayerTop": "http://cdn-dev.ugame.vn/srcsushi/sprite/Layer%209.png",

      "spriteButtonParticleTrue": "http://cdn-dev.ugame.vn/srcsushi/sprite/Shape%204.png",
      "spriteThatRight": "http://cdn-dev.ugame.vn/srcsushi/sprite/that's%20right.png",
      "spriteButtonParticleFalse": "http://cdn-dev.ugame.vn/srcsushi/sprite/Shape%202782%201.png",
      "spriteWrong": "http://cdn-dev.ugame.vn/srcsushi/sprite/Wrong_.png",
    }
  },
  "parameter_game": {
    "timeCreateEnemy": 400,
    "speedMax": 80,
    "speedMin": 40,
    "speedRope": 1.5,
    "listItem": [
      {
        "id": "enemy1",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2013.png",
        "score": 11,
        "ratio": 10
      },
      {
        "id": "enemy2",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2014.png",
        "score": 12,
        "ratio": 10
      },
      {
        "id": "enemy3",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2016.png",
        "score": 10,
        "ratio": 10
      },
      {
        "id": "enemy4",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2017.png",
        "score": 12,
        "ratio": 10
      },
      {
        "id": "enemy5",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2018.png",
        "score": 14,
        "ratio": 10
      },
      {
        "id": "enemy6",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2020.png",
        "score": 17,
        "ratio": 10
      },
      {
        "id": "enemy7",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2021.png",
        "score": 18,
        "ratio": 10
      },
      {
        "id": "enemy8",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2023.png",
        "score": 16,
        "ratio": 10
      },
      {
        "id": "enemy9",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/original.png",
        "score": 13,
        "ratio": 20
      }

    ]
  },
  "audio": {
    "srcAudioBG": "http://cdn-dev.ugame.vn/srcpen/music/1.%20Bgm.mp3",
    "srcAudioTrue": "http://cdn-dev.ugame.vn/srcpen/music/5.%20Success.mp3",
    "srcAudioFalse": "http://cdn-dev.ugame.vn/srcpen/music/6.%20Unsuccess.mp3"
  },
  "config_string": {
    "countPlay": 1000,
    "url": "https://27db95c19f06.ngrok.io/"
  },
  "config_content_popup": {
    "strBeforeCountPlay": "BẠN CÒN ",
    "strAfterCountPlay": " LƯỢT CHƠI",
    "strKeyScore": "điểm",
    "strKeytime": "giây"
  },
  "color_text": {
    "top": "#FFFFFF",
    "body": "#FFFFFF",
    "popup": "#FFFFFF",
  },
  "hashtag": {
    "rule": "#popup_rule",
    "gift": "#popup_gift",
    "pause": "#pause",
    "resume": "#resume",
    "gameover1": "#gameover1",
    "gameover2": "#gameover2"
  },
  "test_game": {
    "login": 1
  },
  "startScore": "0",
  "startHeart": "0",
  "is_count_time": 1
}

export const copyObjectValue = (obj) => {
  let copyvalue = JSON.parse(JSON.stringify(obj));
  return copyvalue;
}

export const getCurrentTime = () => {
  return new Date().getTime();
}

export const compareTimeWithNow = (time) => {
  return getCurrentTime() - new Date(time).getTime();
}

export const errorHandlerTask = async (task, errHandler) => {
  try {
    await task();
  } catch (error) {
    console.log(error);
    if (errHandler) {
      await errHandler();
    }
  }
}







// custom snowboard hero
export const initClientDataCustom = {
  "sprite": {
    "menu": {
      "srcImgBG": "http://cdn-dev.ugame.vn/srcsushi/sprite/BACKGROUND.png",
      "srcImgLogo": "http://cdn-dev.ugame.vn/srcsushi/sprite/TITTLE.png",
      "srcImgBtnPlay": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_PLAY.png",
      "srcImgBtnPlayInPopupPause": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_PLAY.png",
      "srcImgBtnTheLe": "http://cdn-dev.ugame.vn/srcsushi/sprite/B_LEFT.png",
      "srcImgBtnPhanThuong": "http://cdn-dev.ugame.vn/srcsushi/sprite/B_RIGHT.png"
    },
    "game": {
      "srcImgHeart": "http://cdn-dev.ugame.vn/srcsushi/sprite/Avatar.png",
      "srcImgArrow": "http://cdn-dev.ugame.vn/srcsushi/sprite/Avatar.png",
      "srcImgBG": "http://cdn-dev.ugame.vn/srcsushi/sprite/BACKGROUND.png",
      "srcImgBottomBG": "http://cdn-dev.ugame.vn/srcsushi/sprite/BACKGROUND.png",
      "srcImgRectangle": "http://cdn-dev.ugame.vn/srcsushi/sprite/Rectangle%201.png",
      "srcImgBtnPlayInPopupPause": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_PLAY.png",
      "srcImgBtnPause": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_PAUSE.png",
      "srcImgBGInPopupGameOver1": "http://cdn-dev.ugame.vn/srcsushi/sprite/GAMEOVER.png",
      "srcImgBGInPopupGameOver2": "http://cdn-dev.ugame.vn/srcsushi/sprite/GAMEOVER.png",
      "srcImgBtnPlayAgainInPopupGameOver1": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_AGAIN.png",
      "srcImgBtnCloseAgainInPopupGameOver2": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_AGAIN.png",
      "srcImgClosePopupMenu": "http://cdn-dev.ugame.vn/srcsushi/sprite/BUTTON_CLOSE.png",

      "spriteLayerTop": "http://cdn-dev.ugame.vn/srcsushi/sprite/Layer%209.png",

      "spriteButtonParticleTrue": "http://cdn-dev.ugame.vn/srcsushi/sprite/Shape%204.png",
      "spriteThatRight": "http://cdn-dev.ugame.vn/srcsushi/sprite/that's%20right.png",
      "spriteButtonParticleFalse": "http://cdn-dev.ugame.vn/srcsushi/sprite/Shape%202782%201.png",
      "spriteWrong": "http://cdn-dev.ugame.vn/srcsushi/sprite/Wrong_.png",
    }
  },
  "parameter_game": {
    "maxClaimHCoin": 5,
    "timeCreateSkill": 30000,
    "timeCreateHCoin": 60000,
    "timeCreateEnemy": 1000,
    "speedMax": 80,
    "speedMin": 40,
    "speedRope": 1.5,
    "listObstacle": [
      {
        "typeName": "enemy1",
        "srcImage": "https://cdn.ugame.vn/games/images/img-test-8530/HPL_minigame_yard_main_bien_cam.png",
        "ratio ": 20,
        "radius": 112
      },
      {
        "typeName": "enemy2",
        "srcImage": "https://cdn.ugame.vn/games/images/img-test-8530/HPL_minigame_yard_main_cay.png",
        "ratio ": 30,
        "radius": 129
      },
      {
        "typeName": "enemy3",
        "srcImage": "https://cdn.ugame.vn/games/images/img-test-8530/HPL_minigame_yard_main_da.png",
        "ratio ": 20,
        "radius": 60
      },
      {
        "typeName": "enemy4",
        "srcImage": "https://cdn.ugame.vn/games/images/img-test-8530/HPL_minigame_yard_main_hang_rao.png",
        "ratio ": 30,
        "radius": 150
      }
    ],
    "listSkill": [
      {
        "typeName": "skill1",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/original.png",
        "type": 1,
        "radius": 50
      },
      {
        "typeName": "skill2",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/original.png",
        "type": 1,
        "radius": 50
      },
      {
        "typeName": "skill3",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/original.png",
        "type": 1,
        "radius": 50
      }
    ],
    "listHCoin": [
      {
        "typeName": "hcoin",
        "value": 1,
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2013.png",
        "radius": 100
      }
    ]
  },
  "audio": {
    "srcAudioBG": "http://cdn-dev.ugame.vn/srcpen/music/1.%20Bgm.mp3",
    "srcAudioTrue": "http://cdn-dev.ugame.vn/srcpen/music/5.%20Success.mp3",
    "srcAudioFalse": "http://cdn-dev.ugame.vn/srcpen/music/6.%20Unsuccess.mp3"
  },
  "config_string": {
    "countPlay": 1000,
    "url": "https://27db95c19f06.ngrok.io/"
  },
  "config_content_popup": {
    "strBeforeCountPlay": "BẠN CÒN ",
    "strAfterCountPlay": " LƯỢT CHƠI",
    "strKeyScore": "điểm",
    "strKeytime": "giây"
  },
  "color_text": {
    "top": "#FFFFFF",
    "body": "#FFFFFF",
    "popup": "#FFFFFF",
  },
  "hashtag": {
    "rule": "#popup_rule",
    "gift": "#popup_gift",
    "pause": "#pause",
    "resume": "#resume",
    "gameover1": "#gameover1",
    "gameover2": "#gameover2"
  },
  "test_game": {
    "login": 1
  },
  "startScore": "0",
  "startHeart": "0",
  "is_count_time": 1
}

export const baseGameConfig = {
  speed: 10,
  heart: 1,
  point: 0,
  skateboard_length: 250,
  start_at: null,
  hCoin: 0,
  lastHeartBeat: null,
  pos: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
  countDownTime: 0,
  radius: 0,
  listObstacle: [],
  listSkill: [],
  listHCoin: [],
}

export const baseGameConfigPVP = {
  speed: 20,
  betHCoin: 0,
  listObstacle: [],
  listSkill: [],
  listHCoin: [],
}


export const getRandomArrElement = (arr) => {
  const randomArr = Math.floor(Math.random() * arr.length)
  let i = createRandomNumber(-490, 490)
  arr[randomArr].pos = [i, -1920]
  arr[randomArr].isShow = 1
  return arr[Math.floor(Math.random() * arr.length)]
};

export const createRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

export const distance2 = (A, B) => {
  return (A[0] - B[0]) * (A[0] - B[0]) + (A[1] - B[1]) * (A[1] - B[1]);
}

export const distanceBetweenCir = (A, B) => {
  return (A + B) * (A + B);
}