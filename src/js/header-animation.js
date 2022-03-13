const searchInput = document.querySelector('.header-search__input')
const searchBtn = document.querySelector('.icon-search')
const menu = document.querySelector('.menu-wrapper')
const menuBtn = document.querySelector('.hamburger')
const menuLayer = document.querySelector('.menu-overlay')
const mobileMenu = document.querySelector('.mobile-menu')
const closeMenuBtn = document.querySelector('.menu-close')

searchInput.addEventListener('focusin', () => {
    searchBtn.style.padding = 5 + 'px'
})

searchInput.addEventListener('focusout', () => {
    searchBtn.style.padding = ''
})

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('mobile-menu-active')

    menuBtn.classList.add('hamburger-non-active')

    closeMenuBtn.classList.add('menu-close-active')

    menuLayer.style.opacity = 1
    menuLayer.style.visibility = 'visible'

})

menuLayer.addEventListener('click', () => {
    mobileMenu.classList.remove('mobile-menu-active')

    setTimeout(() => menuBtn.classList.remove('hamburger-non-active'),190)

    closeMenuBtn.classList.remove('menu-close-active')


    menuLayer.style.opacity = 0
    menuLayer.style.visibility = ''
})

window.addEventListener('scroll',() => {
    if (window.scrollY > 1) {
        menu.classList.add('scrolled-menu')
    } else {
        menu.classList.remove('scrolled-menu')
    }

})