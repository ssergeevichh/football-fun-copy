export function hideElement(...elements) {
  for (const elem of elements) {
    elem.style.opacity = 0
    elem.style.visibility = 'hidden'
  }
}

export function showElement(...elements) {
  for (const elem of elements) {
    elem.style.opacity = 1
    elem.style.visibility = 'visible'
  }
}
// generate number in range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function toggleContent(contentSelector, contentActiveClass, btnClassName, activeBtn) {
  const allTabContent = document.querySelectorAll(contentSelector)
  const tabButtons = Array.from(document.querySelectorAll(`.${btnClassName}`))
  const activeBtnIndex = tabButtons.findIndex(btn => btn === activeBtn)

  allTabContent.forEach((content) => {
    content.classList.remove(contentActiveClass)
    content.style.display = 'none'
  })
  allTabContent[activeBtnIndex].style.display = 'block'
  setTimeout(() => allTabContent[activeBtnIndex].classList.add(contentActiveClass), 50)
}

export function createSimpleTabs({
  btnsBlockSelector,
  btnActiveClass,
  btnClassName,
  contentClassName,
  contentActiveClass,
}) {
  const tabBtnsBlock = document.querySelector(btnsBlockSelector)
  function setActiveBtn(btnEl) {
    const tabBtns = tabBtnsBlock.querySelectorAll(`.${btnClassName}`)

    tabBtns.forEach(btn => btn.classList.remove(btnActiveClass))
    btnEl.classList.add(btnActiveClass)
  }

  tabBtnsBlock.addEventListener('click', ({ target }) => {
    setActiveBtn(target)
    toggleContent(`.${contentClassName}`, contentActiveClass, btnClassName, target)
  })
}

/**
 *
 * @param {function} func - function to decorate
 * @param {string} btnsBlockSelector - selector of block with buttons
 * @param {string} decoratorSelector - selector of underlinedDecorator
 * @returns {function} - decorated function
 */

export function createDecoratedTabs({
  btnsBlockSelector,
  btnActiveClass,
  btnClassName,
  contentClassName,
  contentActiveClass,
  decoratorSelector,
}) {
  const tabBtnsBlock = document.querySelector(btnsBlockSelector)
  const underlinedDecorator = document.querySelector(decoratorSelector)

  let activeBtn = tabBtnsBlock.children[getRandomInt(0, 9)]
  let timerId = null

  tabBtnsBlock.scrollLeft = activeBtn.getBoundingClientRect().left

  function setActiveBtn(btnEl) {
    const tabBtns = document.querySelectorAll(`.${btnClassName}`)

    tabBtns.forEach(btn => btn.classList.remove(btnActiveClass))
    btnEl.classList.add(btnActiveClass)
  }

  function moveDecorator(btnEl) {
    const tabBtnsBlockCoords = tabBtnsBlock.getBoundingClientRect()

    const activeBtnCoords = btnEl.getBoundingClientRect()
    const activeBtnLeft = tabBtnsBlock.scrollLeft

    underlinedDecorator.style.width = `${activeBtnCoords.width}px`
    underlinedDecorator.style.left = `${activeBtnCoords.left + activeBtnLeft - tabBtnsBlockCoords.left}px`
  }

  toggleContent(`.${contentClassName}`, contentActiveClass, btnClassName, activeBtn)
  moveDecorator(activeBtn)
  setActiveBtn(activeBtn)

  tabBtnsBlock.addEventListener('click', ({ target }) => {
    activeBtn = target
    toggleContent(`.${contentClassName}`, contentActiveClass, btnClassName, activeBtn)
    setActiveBtn(target)
    moveDecorator(target)
  })

  tabBtnsBlock.addEventListener('mouseover', ({ target }) => {
    if (target.classList.contains(btnClassName)) {
      clearTimeout(timerId)
      moveDecorator(target)
    }
  })

  tabBtnsBlock.addEventListener('mouseleave', () => {
    timerId = setTimeout(() => {
      moveDecorator(activeBtn)
    }, 1000)
  })
}
