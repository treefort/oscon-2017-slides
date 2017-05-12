var currentSlide = 0;
var silence = new Audio('silence.mp3');
var slightlyLessSilence = new Audio('silence_short.mp3');

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 33:
      case 37:
        currentSlide--;
        render();
        break;
      case 32:
      case 34:
      case 39:
        currentSlide++;
        render();
        break;
    }
}
function render() {
  stopAllVideos();
  currentSlide = currentSlide > 27 ? 0 : currentSlide;
  currentSlide = currentSlide < 0 ? 27 : currentSlide;
  switch (currentSlide) {
    case 0:   // step 1: punch a tree
    case 1:   // minecraft
    case 2:   // macgyver
      stagger(['.tl', '.tr', '.br', '.bl'], .5, (currentSlide * 30), .3);
      break;
    case 3:   // apollo 13
      stagger(['.tl', '.tr', '.br'], .5, 90, .3);
      transition('.bl', .5, 90.9, 1.2);
      break;
    case 4:   // apollo 13 *ftfy* lolololol
      transition('.bl', .75, 90, 0, Bounce.easeOut);
      break;
    case 5:   // apollo 13
      stagger(['.tl', '.tr', '.br', '.bl'], .5, 115.5, .3);
      break;
    case 6:   // about me: counter hack
      transition('.tl', .5, 115.5);
      stagger(['.tr', '.br', '.bl'], .5, 117, .3);
      break;
    case 7:   // about me: engineer
      transition('.tl', .5, 115.5);
      stagger(['.tr', '.br', '.bl'], .5, 118.5, .3);
      break;
    case 8:   // about me: [distant banjo]
      stopAllVideos();
      stagger(['.tl', '.tr', '.br', '.bl'], .5, 150, .3);
    break;
    case 9:   // terminal cornucopia video
      playVideo('.tc');
      break;
    case 10:  // "...I assume you know why we're here"
      silence.play();
      break;
    case 11:  // zombie apocalypse
      stagger(['.tl', '.tr', '.br', '.bl'], .5, 180, .3);
      break;
    case 12:  // milton video
      playVideo('.milton');
      break;
    case 13:  // universal serial bullwhip video
      playVideo('.usb');
      break;
    case 14:  // keurig
      stagger(['.tl', '.tr', '.br', '.bl'], .5, 210, .3);
      break;
    case 15:  // hedberg video
      playVideo('.hedberg');
      break;
    case 16:  // tools
      stagger(['.tl', '.tr', '.br', '.bl'], .5, 240, .3);
      break;
    case 17:  // microwave: enclosure
      transition('.br', .5, 270);
      transition('.tr', .5, 252, .3);
      transition('.bl', .5, 257, .8);
      transition('.tl', .5, 254, 1.2);
      break;
    case 18:  // microwave: interface
      transition('.bl', .5, 270);
      transition('.tr', .5, 252);
      transition('.tl', .5, 254);
      transition('.br', .5, 270);
      break;
    case 19:  // microwave: motor
      transition('.bl', .5, 270);
      transition('.tl', .5, 270);
      transition('.tr', .5, 252);
      transition('.br', .5, 270);
      break;
    case 20:  // microwave: magnetron
      TweenMax.to('.clip', 1, { scale: 1, ease: Power4.easeInOut, overwrite: true });
      transition('.tr', .5, 270);
      transition('.bl', .5, 270);
      transition('.tl', .5, 270);
      transition('.br', .5, 270);
      break;
    case 21:  // presentation: 10k' view
      TweenMax.to('.clip', 1, { scale: .1, ease: Power4.easeInOut, overwrite: true });
      transition('.tr', .5, 30, 1, Linear.easeInOut);
      transition('.bl', .5, 180, 1.5, Linear.easeInOut);
      transition('.tl', .5, 0, 2, Linear.easeInOut);
      transition('.br', .5, 90, 2.5, Linear.easeInOut);
      break;
    case 22:  // microwave
      TweenMax.to('.clip', .75, { scale: 1, ease: Power4.easeInOut, overwrite: true, delay: 1 });
      transition('.tr', .25, 270);
      transition('.bl', .25, 270, .25);
      transition('.tl', .25, 270, .5);
      transition('.br', .25, 270, .75);
      break;
    case 23:  // hair dryer
      transition('.br', .5, 300);
      transition('.tr', .5, 280, .3);
      transition('.bl', .5, 280, .5);
      break;
    case 24:  // blender
      transition('.br', .5, 315);
      transition('.bl', .5, 280, .3);
      transition('.tr', .5, 300, .5);
      break;
    case 25:  // furby
      transition('.tr', .5, 315);
      transition('.br', .5, 315, .3);
      transition('.bl', .5, 300, .5);
      transition('.tl', .5, 270);
      break;
    case 26:  // "...why?"
      slightlyLessSilence.play();
      break;
    case 27:  // intentionally blank
      stagger('.clip img', .5, 330, .3);
      break;
    default:  // GAH!
      console.log('slide missing:', currentSlide);
      break;
  }
}

function stagger(selector, duration, rotation, delay, ease=Power4.easeInOut) {
  TweenMax.staggerTo(selector, duration, { 'rotation': rotation + '_short', ease: ease, overwrite: true }, delay);
}

function transition(selector, duration, rotation, delay=0, ease=Power4.easeInOut) {
  TweenMax.to(selector, duration, { 'rotation': rotation + '_short', ease: ease, overwrite: true, delay: delay });
}

function playVideo(id) {
  var video = document.querySelector(id);
  video.addEventListener('ended',function() {
    video.classList.remove('playing');
  },false);
  video.classList.add('playing');
  video.currentTime = 0;
  video.play();
}

function stopAllVideos() {
  var videos = document.querySelectorAll('video');
  _.each(videos, (video) => {
    video.pause();
    video.currentTime = 0;
    video.classList.remove('playing');
  });
}
