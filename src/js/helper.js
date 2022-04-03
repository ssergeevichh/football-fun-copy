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

export function animateTabs({ currentBtn ,btnSelector, contentSelector, btnActiveClass, contentActiveClass}) {
    const tabBtns = document.querySelectorAll(btnSelector)
    const tabContent = document.querySelectorAll(contentSelector)

    tabBtns.forEach(btn => btn.classList.remove(btnActiveClass))
    currentBtn.classList.add(btnActiveClass)

    tabContent.forEach(elem => {
        elem.classList.remove(contentActiveClass)
        elem.style.display = 'none'

        if (elem.dataset.id === currentBtn.id) {
            elem.style.display = 'block'
            setTimeout(() => elem.classList.add(contentActiveClass), 50)
        }
    })
}
