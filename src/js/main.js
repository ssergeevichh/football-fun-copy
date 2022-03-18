import '../styles/main.scss';

import './header-animation'
import './top-news'

export function hideElement(...elements) {
    for (let elem of elements) {
        elem.style.opacity = 0
        elem.style.visibility = 'hidden'
    }
}

export function showElement(...elements) {
    for (let elem of elements) {
        elem.style.opacity = 1
        elem.style.visibility = 'visible'
    }
}