import { addUnderlinedDecorator } from './helper';

let tablesTabsOptions = {
    tabBlockSelector: '.tab-content-wrapper',
    btnSelector: '.tab-btns__item',
    contentSelector: '.tab-content__item',
    btnActiveClass: 'tab-btns__item--active',
    contentActiveClass: 'tab-content__item--active'
}
// createTabs(tablesTabsOptions)


// let teamInfoTabsOptions = {
//     tabBlockSelector:'.team-tabs-container',
//     btnSelector: '.team-tab-btn',
//     contentSelector: '.team-tab-content',
//     btnActiveClass: 'team-tab-btn--active',
//     contentActiveClass: 'team-tab-content--active'
// }

let teamInfoDecoratorOptions = {
    // createTabsFunc: createTabs,
    btnsBlockSelector: '.team-tabs__btns',
    btnClassName: 'team-tab-btn',
    decoratorSelector: '.team-tabs__btns-decorator',
    btnActiveClass: 'team-tab-btn--active',
}
addUnderlinedDecorator(teamInfoDecoratorOptions)




// tabAnimation(teamInfoTabsOptions)