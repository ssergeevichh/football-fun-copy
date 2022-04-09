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

// function setActiveBtn(tabBtns, activeClass,event) {
//     tabBtns.forEach(btn => btn.classList.remove(activeClass))
//     event.target.classList.add(activeClass)
// }

// function setActiveContent(tabContents, activeClass,event) {
//     tabContents.forEach(content => {
//         content.classList.remove(activeClass)
//         content.style.display
//     })
// }

// export function createTabs({ tabBlockSelector, btnSelector, contentSelector, btnActiveClass, contentActiveClass }) {
//     const tabBlock = document.querySelector(tabBlockSelector)
//     const tabBtns = tabBlock.querySelectorAll(btnSelector)
//     const tabContents = tabBlock.querySelectorAll(contentSelector)

//     tabBlock.addEventListener('click', (e) => {
//         if (e.target.closest(btnSelector)) {

//             setActiveBtn(tabBtns, btnActiveClass,e)    

//             tabContents.forEach(elem => {
//                 elem.classList.remove(contentActiveClass)
//                 elem.style.display = 'none'

//                 if (elem.dataset.id === e.target.id) {
//                     elem.style.display = 'block'
//                     setTimeout(() => elem.classList.add(contentActiveClass), 50)
//                 }
//             })
//         }
//     })

// }

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

export function addUnderlinedDecorator({ createTabsFunc, btnsBlockSelector, btnActiveClass, btnClassName, decoratorSelector }) {
    const tabBtnsBlock = document.querySelector(btnsBlockSelector)
    const tabBtnsBlockCoords = tabBtnsBlock.getBoundingClientRect()
    const underlinedDecorator = document.querySelector(decoratorSelector)

    let tempActiveBtn = tabBtnsBlock.children[generateRandom(0, 9)]
    let activeBtnCoords = tempActiveBtn.getBoundingClientRect()
    let timerId = null
    let activeBtn = null
    tabBtnsBlock.scrollLeft = activeBtnCoords.left

    function setActiveBtn(btnEl) {
        const tabBtns = document.querySelectorAll(`.${btnClassName}`)

        tabBtns.forEach(btn => btn.classList.remove(btnActiveClass))
        btnEl.classList.add(btnActiveClass)
    }

    function moveDecorator(btnEl) {
        activeBtnCoords = btnEl.getBoundingClientRect()
        const activeBtnLeft = tabBtnsBlock.scrollLeft

        underlinedDecorator.style.width = `${activeBtnCoords.width}px`
        underlinedDecorator.style.left = `${activeBtnCoords.left + activeBtnLeft - tabBtnsBlockCoords.left}px`
    }

    setActiveBtn(tempActiveBtn)
    moveDecorator(tempActiveBtn)
    
    tabBtnsBlock.addEventListener('click', function ({target}) {
        activeBtn = target

        setActiveBtn(target)
        moveDecorator(target)
    })

    tabBtnsBlock.addEventListener('mouseover', function ({target}) {
        if (target.classList.contains(btnClassName)) {
            clearTimeout(timerId)
            moveDecorator(target)
        }
    })

    tabBtnsBlock.addEventListener('mouseleave', function () {
        timerId = setTimeout(() => {
            moveDecorator(activeBtn)
        },1000)
    })

    // return function (options) {
    //     createTabsFunc(options)
    // }
}
