const searchInput = document.querySelector('.header-search__input')
const searchBtn = document.querySelector('.icon-search')

searchInput.addEventListener('focusin', () => {
    searchBtn.style.padding = 5 + 'px'
})

searchInput.addEventListener('focusout', () => {
    searchBtn.style.padding = ''
})