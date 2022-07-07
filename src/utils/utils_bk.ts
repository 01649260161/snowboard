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
        "ratio ": 10
      },
      {
        "id": "enemy2",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2014.png",
        "score": 12,
        "ratio ": 10
      },
      {
        "id": "enemy3",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2016.png",
        "score": 10,
        "ratio ": 10
      },
      {
        "id": "enemy4",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2017.png",
        "score": 12,
        "ratio ": 10
      },
      {
        "id": "enemy5",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2018.png",
        "score": 14,
        "ratio ": 10
      },
      {
        "id": "enemy6",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2020.png",
        "score": 17,
        "ratio ": 10
      },
      {
        "id": "enemy7",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2021.png",
        "score": 18,
        "ratio ": 10
      },
      {
        "id": "enemy8",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/Layer%2023.png",
        "score": 16,
        "ratio ": 10
      },
      {
        "id": "enemy9",
        "srcImage": "http://cdn-dev.ugame.vn/srcsushi/obj_fullsize/original.png",
        "score": 13,
        "ratio ": 20
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
  currTargetObj: null,
  heart: 3,
  point: 0,
  lastHeartBeat: null,
  start_at: null,
  count_down_time: 10
}

export const copyObjectValue = (obj) => {
  let copyvalue = JSON.parse(JSON.stringify(obj));
  return copyvalue;
}

export const getRandomArrElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

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
