import Splide from '@splidejs/splide';

const tabBtns = document.querySelectorAll('.tab-btns__item')
const tabContent = document.querySelectorAll('.tab-content__item')

//tabs animation
document.addEventListener('click', ({ target }) => {
    if (target.className === 'tab-btns__item') {
        tabBtns.forEach(btn => btn.classList.remove('tab-btns__item--active'))
        target.classList.add('tab-btns__item--active')

        tabContent.forEach(elem => {
            elem.classList.remove('tab-content__item--active')
            elem.style.display = 'none'

            if (elem.dataset.id === target.id) {
                elem.style.display = 'block'
                setTimeout(() => elem.classList.add('tab-content__item--active'), 50)
            }
        })
    }
})

//slider
