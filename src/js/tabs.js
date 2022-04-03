import { animateTabs } from './helper';
//tabs animation
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelector('.team-tabs__btns')
    setTimeout(() => {
        tabBtns.firstElementChild.click()
    },1500)

})
document.addEventListener('click', ({ target }) => {
    if (target.className === 'tab-btns__item') {
        let options = {
            currentBtn: target,
            btnSelector: '.tab-btns__item',
            contentSelector: '.tab-content__item',
            btnActiveClass: 'tab-btns__item--active',
            contentActiveClass: 'tab-content__item--active'
        }

        animateTabs(options)
    }
    if (target.className === 'team-tab-btn') {
        
        let options = {
            currentBtn: target,
            btnSelector: '.team-tab-btn',
            contentSelector: '.team-tab-content',
            btnActiveClass: 'team-tab-btn--active',
            contentActiveClass: 'team-tab-content--active'
        }
        
        animateTabs(options)
        
        const tabBtns = document.querySelector('.team-tabs__btns')
        const decorator = document.querySelector('.team-tabs__btns-decorator')
        const btnCoordinates = target.getBoundingClientRect()

        decorator.style.width = `${btnCoordinates.width}px`
        decorator.style.left = `${btnCoordinates.left - tabBtns.firstElementChild.offsetWidth - 1}px`

        
    }

})




