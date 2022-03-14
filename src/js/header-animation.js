const searchInput = document.querySelector('.header-search__input')
const searchBtn = document.querySelector('.icon-search')
const menu = document.querySelector('.menu-wrapper')
const menuBtn = document.querySelector('.hamburger')
const menuLayer = document.querySelector('.menu-overlay')
const mobileMenu = document.querySelector('.mobile-menu-wrapper')
const closeMenuBtn = document.querySelector('.menu-close')
const mobileCloseBtn = document.querySelector('.header-line-mobile__arrow')
const mobileSearchBtn = document.querySelector('.icon-search-mobile')
const searchBlock = document.querySelector('.header-search')

function hideElement(...elements) {
    for (let elem of elements) {
        elem.style.opacity = 0
        elem.style.visibility = 'hidden'
    }
}

function showElement(...elements) {
    for (let elem of elements) {
        elem.style.opacity = 1
        elem.style.visibility = 'visible'
    }
}

// fixed menu
window.addEventListener('scroll', () => {
    if (window.scrollY > 1) {
        menu.classList.add('scrolled-menu')
    } else {
        menu.classList.remove('scrolled-menu')
    }

})

//searching input animation
searchInput.addEventListener('focusin', () => {
    searchBtn.classList.add('icon-search__active')
})

searchInput.addEventListener('focusout', () => {
    searchBtn.classList.remove('icon-search__active')

})

//mobile version of menu
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('mobile-menu-active')

    hideElement(menuBtn)

    showElement(closeMenuBtn, menuLayer)

})

//mobile version of menu
document.addEventListener('click', ({target}) => {
    if(target === menuLayer || target === mobileCloseBtn) {
        mobileMenu.classList.remove('mobile-menu-active')
        
        setTimeout(() => showElement(menuBtn), 190)
        
        hideElement(closeMenuBtn, menuLayer)
    }
})

//mobile searching block
mobileSearchBtn.addEventListener('click', () => {
    searchInput.setAttribute("placeholder", "Поиск")
    hideElement(mobileSearchBtn)
    showElement(searchBlock)
    document.addEventListener('click', ({target}) => {
        if(target !== searchInput && !target.closest('.icon-search-mobile') && !target.closest('.icon-search')) {
            hideElement(searchBlock)
            showElement(mobileSearchBtn )
        }
    })
})
