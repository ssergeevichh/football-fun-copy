import { animateTabs } from './helper';
//tabs animation
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
})




