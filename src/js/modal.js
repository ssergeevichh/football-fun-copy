
let defaultProps = {
    clickOutside: true,
    fullScreen: false
}

export let openModal = (selector, options = defaultProps) => {
    document.body.style.overflowY = 'hidden'
    const modalLayer = document.createElement('div')
    modalLayer.className = 'modal-overlay'
    setTimeout(() => {
        modalLayer.style.visibility = 'visible'
        modalLayer.style.opacity = 1
    }, 100)

    let modalWindow = document.querySelector(selector)
    let parentOfModal = modalWindow.parentNode
    let closeBtn = createCloseEl();

    document.body.prepend(modalLayer);
    modalLayer.append(modalWindow)

    modalWindow.classList.add('modal-block')
    modalWindow.prepend(closeBtn)

    if (options.fullScreen) {
        modalWindow.classList.add('full-screen')
    }

    function createCloseEl() {
        const closeBtn = document.createElement('div')
        const span1 = document.createElement('span')
        const span2 = document.createElement('span')

        closeBtn.className = 'close-btn'

        span1.classList.add('close__line')
        span2.classList.add('close__line')

        closeBtn.append(span1)
        closeBtn.append(span2)

        return closeBtn
    }

    function closeModal() {
        document.body.style.overflowY = 'auto'

        setTimeout(() => {
            parentOfModal.prepend(modalWindow)
            modalLayer.remove()
            closeBtn.remove()
        }, 800)

        modalLayer.style.visibility = 'hidden'
        modalLayer.style.opacity = 0
    }

    document.addEventListener('click', function ({ target }) {
        if (!options.clickOutside && target === closeBtn || target.className === 'close__line') {
            closeModal()
        }
        else if (options.clickOutside && target.classList.contains('modal-overlay') || target === closeBtn || target === closeBtn.firstChild) {
            closeModal()
        }
    })
}





