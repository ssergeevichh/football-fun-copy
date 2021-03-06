import { hideElement, showElement } from './helper'

const searchInput = document.querySelector('.header-search__input')
const searchBtn = document.querySelector('.icon-search')
const menu = document.querySelector('.menu-wrapper')
const menuBtn = document.querySelector('.icon-hamburger-menu')
const menuLayer = document.querySelector('.menu-overlay')
const mobileMenu = document.querySelector('.mobile-menu-wrapper')
const closeMenuBtn = document.querySelector('.menu-close')
const mobileCloseBtn = document.querySelector('.icon-arrow-left-menu')
const mobileSearchBtn = document.querySelector('.icon-search-mobile')
const searchBlock = document.querySelector('.header-search')
const subMenuTour = document.querySelector('.tour')
const mobileMediaQuery = window.matchMedia('(max-width: 575px)')

const subMenuNews = document.querySelector('.news')

// fixed menu
window.addEventListener('scroll', () => {
  if (window.scrollY > 1) {
    menu.classList.add('menu-wrapper--active')
  }
  else {
    menu.classList.remove('menu-wrapper--active')
  }
})

// searching input animation
searchInput.addEventListener('focusin', () => {
  searchBtn.classList.add('icon-search__active')
})

searchInput.addEventListener('focusout', () => {
  searchBtn.classList.remove('icon-search__active')
})

// mobile version of menu
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('mobile-menu-active')

  hideElement(menuBtn)

  showElement(closeMenuBtn, menuLayer)

  document.body.style.overflow = 'hidden'
})

// mobile version of menu
document.addEventListener('click', ({ target }) => {
  if (target === menuLayer || target === mobileCloseBtn) {
    mobileMenu.classList.remove('mobile-menu-active')

    setTimeout(() => showElement(menuBtn), 190)

    hideElement(closeMenuBtn, menuLayer)

    document.body.style.overflow = 'auto'
  }
})

// internal menu's
// .sub-active for full screen
document.addEventListener('click', ({ target }) => {
  if (target.dataset.tour) {
    mobileMenu.classList.add('sub-active')
    showElement(subMenuTour)
  }
  else if (target.dataset.news) {
    mobileMenu.classList.add('sub-active')
    showElement(subMenuNews)
  }
  if (target.classList.contains('back')) {
    mobileMenu.classList.remove('sub-active')
    mobileMenu.style.top = ''
    hideElement(subMenuTour, subMenuNews)
  }
})

// mobile searching block
if (mobileMediaQuery.matches) {
  document.addEventListener('click', ({ target }) => {
    if (target === mobileSearchBtn) {
      searchInput.setAttribute('placeholder', '??????????')
      hideElement(mobileSearchBtn)
      showElement(searchBlock)
    }
    if (target !== searchInput && !target.closest('.icon-search-mobile') && !target.closest('.icon-search')) {
      hideElement(searchBlock)
      showElement(mobileSearchBtn)
    }
  })
}
