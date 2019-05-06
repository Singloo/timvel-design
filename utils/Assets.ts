const icons = {
  add: {
    source: require('../assets/add.png'),
  },
  arrow_down: {
    source: require('../assets/arrow_down.png'),
  },
  arrow_left: {
    source: require('../assets/arrow_left.png'),
  },
  arrow_right: {
    source: require('../assets/arrow_right.png'),
  },
  arrow_up: {
    source: require('../assets/arrow_up.png'),
  },
  close: {
    source: require('../assets/close.png'),
  },
  comment: {
    source: require('../assets/comment.png'),
  },
  setting: {
    source: require('../assets/setting.png'),
  },
  thumb_down: {
    source: require('../assets/thumb_down.png'),
  },
  thumb_up: {
    source: require('../assets/thumb_up.png'),
  },
  wrong: {
    source: require('../assets/wrong.png'),
  },
  send: {
    source: require('../assets/send.png'),
  },
  tag: {
    source: require('../assets/tag.png'),
  },
  smile: {
    source: require('../assets/smile.png'),
  },
  cry: {
    source: require('../assets/cry.png'),
  },
  success: {
    source: require('../assets/success.png'),
  },
  coin: {
    source: require('../assets/coin.png'),
  },
  questionMark: {
    source: require('../assets/question_mark.png'),
  },
  edit: {
    source: require('../assets/edit.png'),
  },
  gift: {
    source: require('../assets/gift.png'),
  },
  calendar: {
    source: require('../assets/calendar.png'),
  },
  time_travel: {
    source: require('../assets/time_travel.png'),
  },
};

const target = {
  actionButton: {
    source: require('../assets/action_button.png'),
  },
  letterPaper1: {
    source: require('../assets/letter_paper_1.png'),
  },
  flower1: {
    source: require('../assets/flower_1.png'),
  },
  flower2: {
    source: require('../assets/flower_2.png'),
  },
  flower3: {
    source: require('../assets/flower_3.png'),
  },
  flower4: {
    source: require('../assets/flower_4.png'),
  },
  shit1: {
    source: require('../assets/shit_1.png'),
  },
  shit2: {
    source: require('../assets/shit_2.png'),
  },
  shit3: {
    source: require('../assets/shit_3.png'),
  },
  shit4: {
    source: require('../assets/shit_4.png'),
  },
  shit5: {
    source: require('../assets/shit_5.png'),
  },
  touzi: {
    source: require('../assets/touzi.png'),
  },
};
const tempUse = {};

const art = {
  eu_bird: {
    source: require('../assets/eu_bird.png'),
  },
  eu_bosk: {
    source: require('../assets/eu_bosk.png'),
  },
  eu_cactus: {
    source: require('../assets/eu_cactus.png'),
  },
  eu_deer: {
    source: require('../assets/eu_deer.png'),
  },
  eu_flamingo: {
    source: require('../assets/eu_flamingo.png'),
  },
  eu_fox: {
    source: require('../assets/eu_fox.png'),
  },
};

const lotties = {
  LoadingDotsDown: {
    source: require('../assetsLotties/loading_colorful_dots.json'),
  },
  Tick: {
    source: require('../assetsLotties/tick.json'),
  },
  JollyWalker: {
    source: require('../assetsLotties/jolly_walker.json'),
  },
  LoadingHorizontalDots: {
    source: require('../assetsLotties/loading_horizontal_dots.json'),
  },
  LoadingPlane: {
    source: require('../assetsLotties/loading_plane.json'),
  },
};

const logo = {
  center: {
    source: require('../assets/center.png'),
  },
  wrapper1: {
    source: require('../assets/wrapper1.png'),
  },
  wrapper2: {
    source: require('../assets/wrapper2.png'),
  },
};

const weather = {
  sunny: {
    source: require('../assets/sunny.png'),
  },
  clearNight: {
    source: require('../assets/clear_night.png'),
  },
  snowMid: {
    source: require('../assets/snow_mid.png'),
  },
  smallRain: {
    source: require('../assets/small_rain.png'),
  },
  sleet: {
    source: require('../assets/sleet.png'),
  },
  rainstorm: {
    source: require('../assets/rainstorm.png'),
  },
  sand: {
    source: require('../assets/sand.png'),
  },
  fog: {
    source: require('../assets/fog.png'),
  },
  cloudy: {
    source: require('../assets/cloudy.png'),
  },
  dust: {
    source: require('../assets/dust.png'),
  },
  lessCloudyNight: {
    source: require('../assets/less_cloudy_night.png'),
  },
  cloudySky: {
    source: require('../assets/cloudy_sky.png'),
  },
  thunderstorm: {
    source: require('../assets/thunder_storm.png'),
  },
  thunderShower: {
    source: require('../assets/thunder_shower.png'),
  },
  snowBig: {
    source: require('../assets/snow_big.png'),
  },
  lessCloudy: {
    source: require('../assets/less_cloudy.png'),
  },
  sandstorm: {
    source: require('../assets/sandstorm.png'),
  },
  shower: {
    source: require('../assets/shower.png'),
  },
};
const emojis = {
  vomit: {
    source: require('../assets/vomit.png'),
  },
  shock: {
    source: require('../assets/shock.png'),
  },
  nofeeling: {
    source: require('../assets/nofeeling.png'),
  },
  laugh: {
    source: require('../assets/laugh.png'),
  },
  angry: {
    source: require('../assets/angry.png'),
  },
};
const notification = {
  NotificationReplay: {
    source: require('../assets/notification_reply.png'),
  },
};
const tab = {
  tabHome: {
    source: require('../assets/tab_home.png'),
  },
  tabHome2: {
    source: require('../assets/tab_home2.png'),
  },
  tabHome2Active: {
    source: require('../assets/tab_home2_active.png'),
  },
  tabShop: {
    source: require('../assets/tab_shop.png'),
  },
  tabNotification: {
    source: require('../assets/tab_notification.png'),
  },
  tabProfile: {
    source: require('../assets/tab_profile.png'),
  },
};
const Assets = {
  ...icons,
  ...tempUse,
  ...art,
  ...lotties,
  ...target,
  ...logo,
  ...weather,
  ...emojis,
  ...notification,
  ...tab,
};
export default Assets;
