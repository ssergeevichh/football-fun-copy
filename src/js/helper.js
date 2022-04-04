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

export function createTabs({ tabBlockSelector, btnSelector, contentSelector, btnActiveClass, contentActiveClass }) {
    const tabBlock = document.querySelector(tabBlockSelector)
    const tabBtns = tabBlock.querySelectorAll(btnSelector)
    const tabContents = tabBlock.querySelectorAll(contentSelector)

    tabBlock.addEventListener('click', ({ target }) => {
        if (target.closest(btnSelector)) {

            tabBtns.forEach(btn => btn.classList.remove(btnActiveClass))
            target.classList.add(btnActiveClass)

            tabContents.forEach(elem => {
                elem.classList.remove(contentActiveClass)
                elem.style.display = 'none'

                if (elem.dataset.id === target.id) {
                    elem.style.display = 'block'
                    setTimeout(() => elem.classList.add(contentActiveClass), 50)
                }
            })
        }
    })

}

/**
 * 
 * @param {function} func - function to decorate
 * @param {string} btnsBlockSelector - selector of block with buttons
 * @param {string} decoratorSelector - selector of decorator
 * @returns {function} - decorated function
 */

export function animateTabsDecorator(func, btnsBlockSelector, decoratorSelector) {
    const tabBtnsBlock = document.querySelector(btnsBlockSelector)

    setTimeout(() => tabBtnsBlock.firstElementChild.click(), 1500)
    
    tabBtnsBlock.addEventListener('click', ({ target }) => {
        if (target.className === 'team-tab-btn') {
            const btnsBlockCoords = tabBtnsBlock.getBoundingClientRect()
            const currentBtnCoordinates = target.getBoundingClientRect()
            const setSizing = (elem = currentBtnCoordinates) => {
                const decorator = document.querySelector(decoratorSelector)
                decorator.style.width = `${elem.width}px`
                decorator.style.left = `${elem.left - btnsBlockCoords.left}px`
            }

            setSizing()

            tabBtnsBlock.addEventListener('mouseover', ({ target }) => {
                if (target.className !== 'team-tabs__btns') {
                    const currentBtnCoordinates = target.getBoundingClientRect()
                    setSizing(currentBtnCoordinates)
                }
            })

            tabBtnsBlock.addEventListener('mouseleave', () => {
                setTimeout(() => setSizing(), 1000)
            })
        }

    })

    return function (options) {
        func(options)
    }
}
