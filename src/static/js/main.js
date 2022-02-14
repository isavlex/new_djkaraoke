import '../scss/main.scss'
import tns from '../../../node_modules/tiny-slider/src/tiny-slider.js'
import showHide from '../../components/menu/menu'
import 'lightgallery.js'
import 'lg-thumbnail.js'
import 'lg-video.js'
import './call'
lightGallery(document.getElementById('leading-video'), {
  thumbnail: true,
})
lightGallery(document.getElementById('smoke-video'), {
  thumbnail: true,
})
lightGallery(document.getElementById('photo-gallery'), {
  thumbnail: true,
})
lightGallery(document.getElementById('dj-video'), {
  thumbnail: true,
})
lightGallery(document.getElementById('karaoke-video'), {
  thumbnail: true,
})

const reviewsSlider = tns({
  container: '.reviews__slides',
  items: 1,
  slideBy: 1,
  controlsText: ['', ''],
  controlsContainer: '.reviews__controls',
  navContainer: '.reviews__nav',
})

showHide({
  clickEl: '.hamburger',
  clckToggleEl: '.hamburger__layers',
  clickToggleClass: 'hamburger__layers--disclosed',
  showHideEl: '.menu',
  showHideToggleClass: 'menu--disclosed',
  clickBreakEl: '.menu__link',
})


