import { showElement } from './helper'
import { sendResult } from './server'

const votingBlock = document.querySelector('.voting')
const votingBtns = document.querySelectorAll('.voting__progress')

let voting = ({target}) => {
    if (target.closest('.voting__progress')) {
        let currentBtn = target.id
        sendResult(currentBtn)
            .then(data => {
                let currentObj = data.find((item) => item.index == currentBtn)
                let generalCounter = 0
                data.forEach(item => {
                    generalCounter += item.value
                })
                ++currentObj.value
                ++generalCounter

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
                votingBlock.removeEventListener('click',voting)
            })
    }
}

votingBlock.addEventListener('click', voting)
