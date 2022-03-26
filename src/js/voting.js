import { hideElement, showElement } from './helper'
import { sendResult } from './server'

const votingBlock = document.querySelector('.voting')
const votingBtns = document.querySelectorAll('.voting__progress')
const preloader = document.querySelector('.voting__preload')

let voting = ({ target }) => {
    if (target.closest('.voting__progress')) {
        votingBlock.classList.add('voting--non-active')
        showElement(preloader)
        let currentBtn = target.id
        sendResult(currentBtn)
            .then(data => {
                hideElement(preloader)
                votingBlock.classList.remove('voting--non-active')


                let initialValue = 0
                let generalCounter = data.reduce((previousValue, currentValue) => previousValue + currentValue.value, initialValue)

                votingBtns.forEach((btn, index) => {
                    let currentCounter = data[index].value
                    let progressState = btn.querySelector('.voting__progress-state')
                    let percentEl = btn.querySelector('.voting__progress-percent')
                    let quantityEl = btn.querySelector('.voting__progress-quantity')
                    let progressLine = btn.querySelector('.voting__progress-line')
                    let percentNum = Math.round(currentCounter * 100 / generalCounter)

                    showElement(progressState)

                    percentEl.innerHTML = percentNum
                    quantityEl.innerHTML = currentCounter
                    progressLine.style.width = percentNum + '%'
                })
                votingBlock.removeEventListener('click', voting)
            }, reason => {
                votingBlock.classList.remove('voting--non-active')
                hideElement(preloader)
                alert(reason)
            })
    }
}

votingBlock.addEventListener('click', voting)
