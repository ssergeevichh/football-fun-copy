import { createTabs, animateTabsDecorator } from './helper';

let tablesTabsOptions = {
    tabBlockSelector:'.tab-content-wrapper',
    btnSelector: '.tab-btns__item',
    contentSelector: '.tab-content__item',
    btnActiveClass: 'tab-btns__item--active',
    contentActiveClass: 'tab-content__item--active'
}
createTabs(tablesTabsOptions)


let teamInfoOptions = {
    tabBlockSelector:'.team-tabs-container',
    btnSelector: '.team-tab-btn',
    contentSelector: '.team-tab-content',
    btnActiveClass: 'team-tab-btn--active',
    contentActiveClass: 'team-tab-content--active'
}

let tabAnimation = animateTabsDecorator(createTabs,'.team-tabs__btns','.team-tabs__btns-decorator')

tabAnimation(teamInfoOptions)