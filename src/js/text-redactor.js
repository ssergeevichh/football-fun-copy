function textSlicer(selector,quantity) {
    const textElements = document.querySelectorAll(selector)

    textElements.forEach(textItem => {
        let innerText = textItem.innerHTML
        if(innerText.length > quantity) {
            textItem.innerHTML = innerText.slice(0, quantity) + '...'
        }
    })
}

textSlicer('.news-title', 83)
textSlicer('.content-wrapper__desc',127)