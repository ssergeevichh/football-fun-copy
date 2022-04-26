import '../../styles/home.scss'

import Splide from '@splidejs/splide'
import { createDecoratedTabs, createSimpleTabs } from '../common/helper'
import { createVoting } from '../common/voting'
import '../common/header-animation.js'

// tabs creation
const simpleTabsOptions = {
  btnsBlockSelector: '.tab-btns',
  btnActiveClass: 'tab-btns__item--active',
  btnClassName: 'tab-btns__item',
  contentClassName: 'tab-content__item',
  contentActiveClass: 'tab-content__item--active',
}
createSimpleTabs(simpleTabsOptions)

const teamInfoDecoratorOptions = {
  btnsBlockSelector: '.team-tabs__btns',
  btnClassName: 'team-tab-btn',
  contentClassName: 'team-tab-content',
  contentActiveClass: 'team-tab-content--active',
  decoratorSelector: '.team-tabs__btns-decorator',
  btnActiveClass: 'team-tab-btn--active',
}
createDecoratedTabs(teamInfoDecoratorOptions)

// voting fuctions callings
createVoting('#gold-medal-in-sport-2020')
createVoting('#place-championship-2020')

// slider callings
document.addEventListener('DOMContentLoaded', () => {
  const splide = new Splide('#slider', {
    perPage: 1,
  })
  splide.mount()

  const splideTransfer = new Splide('#transfers', {
    perPage: 3,
    gap: 28,
    perMove: 1,
    breakpoints: {
      991: {
        perPage: 2,
      },
      575: {
        perPage: 1,
      },
    },
  })
  splideTransfer.mount()

  const splideHistory = new Splide('#history', {
    perPage: 3,
    gap: 28,
    perMove: 1,
    breakpoints: {
      991: {
        perPage: 2,
      },
      575: {
        perPage: 1,
      },
    },
  })
  splideHistory.mount()

  const splideRating = new Splide('#rating', {
    perPage: 4,
    gap: 18,
    perMove: 1,
    breakpoints: {
      991: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      575: {
        perPage: 1,
      },
    },
  })
  splideRating.mount()
})
