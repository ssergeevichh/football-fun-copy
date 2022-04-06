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

function generateRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 
 * @param {function} func - function to decorate
 * @param {string} btnsBlockSelector - selector of block with buttons
 * @param {string} decoratorSelector - selector of underlinedDecorator
 * @returns {function} - decorated function
 */

export function addUnderlinedDecorator({ createTabsFunc, btnsBlockSelector, btnClassName, decoratorSelector }) {
    const tabBtnsBlock = document.querySelector(btnsBlockSelector)
    const tabBtnsBlockCoords = tabBtnsBlock.getBoundingClientRect()
    const underlinedDecorator = document.querySelector(decoratorSelector)
    
    let mouseOveredElement = null
    let activeBtnCoords = {}
    let activeBtnLeft = 0

    setTimeout(() => tabBtnsBlock.children[generateRandom(0, 9)].click(), 1500)

    tabBtnsBlock.addEventListener('click', ({ target }) => {
        if (target.className === btnClassName) {
            activeBtnCoords = target.getBoundingClientRect()
            activeBtnLeft = tabBtnsBlock.scrollLeft
            
            underlinedDecorator.style.width = `${activeBtnCoords.width}px`
            underlinedDecorator.style.left = `${activeBtnCoords.left + activeBtnLeft - tabBtnsBlockCoords.left}px`

            tabBtnsBlock.scrollLeft = activeBtnCoords.left
        }
    })
    document.addEventListener('mouseover', ({ target }) => {
        mouseOveredElement = target
        
        if (target.classList.contains(btnClassName)) {
            const targetBtnCoordinates = target.getBoundingClientRect()
            underlinedDecorator.style.width = `${targetBtnCoordinates.width}px`
            underlinedDecorator.style.left = `${targetBtnCoordinates.left + tabBtnsBlock.scrollLeft - tabBtnsBlockCoords.left}px`
        }
    })

    tabBtnsBlock.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (mouseOveredElement.className !== btnClassName) {
                underlinedDecorator.style.width = `${activeBtnCoords.width}px`
                underlinedDecorator.style.left = `${activeBtnCoords.left + activeBtnLeft - tabBtnsBlockCoords.left}px`
            }

        }, 1000)
    })

    return function (options) {
        createTabsFunc(options)
    }
}
