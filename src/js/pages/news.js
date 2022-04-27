import '../../styles/news.scss'

import Splide from '@splidejs/splide'
import '../common/header-animation'
import { createSimpleTabs } from '../common/helper'

const simpleTabsOptions = {
  btnsBlockSelector: '.tab-btns',
  btnActiveClass: 'tab-btns__item--active',
  btnClassName: 'tab-btns__item',
  contentClassName: 'tab-content__item',
  contentActiveClass: 'tab-content__item--active',
}
createSimpleTabs(simpleTabsOptions)

document.addEventListener('DOMContentLoaded', () => {
  const splideNews = new Splide('#md-news-slider', {
    perPage: 1,
    classes: {
      page: 'icon-boll',
    },
  })
  splideNews.mount()
})
