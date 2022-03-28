import { hideElement, showElement } from './helper'
import { sendPoll } from './server'

const votingBlock = document.querySelector('.voting-forms')
const rejectedMessage = document.querySelector('.voting-forms__error-message')

let poll = {};

votingBlock.addEventListener('change', ({ target }) => {
    poll = {
        pollId: target.closest('.voting-form').id,
        voteIndex: target.dataset.id
    }
})

let voting = (e) => {
    if (e.target.closest('[data-id="vote-btn"]')) {
        e.preventDefault();
        const submitVoteBtn = e.target
        const currentPoll = e.target.closest('.voting')

        const resultItems = currentPoll.querySelectorAll('.voting-result')
        const answerVariantsBlock = currentPoll.querySelector('.voting__variants-wrapper')
        const preloader = currentPoll.querySelector('.voting__preload')
        const votingResultsBlock = currentPoll.querySelector('.voting__results-wrapper')

        if (currentPoll.lastChild === rejectedMessage) {
            rejectedMessage.style.display = 'none'
            currentPoll.removeChild(rejectedMessage)
        }

        if (Object.keys(poll).length !== 0 && poll.pollId === e.target.closest('.voting-form').id) {
            submitVoteBtn.classList.add('btn--non-active')

            answerVariantsBlock.classList.add('voting__variants-wrapper--filter-blur')
            showElement(preloader)

            sendPoll(poll)
                .then(data => {
                    poll = {}

                    submitVoteBtn.setAttribute('disabled', 'disabled')

                    hideElement(preloader, answerVariantsBlock)
                    showElement(votingResultsBlock)

                    answerVariantsBlock.classList.remove('voting__variants-wrapper--filter-blur')
                    answerVariantsBlock.classList.add('voting__variants-wrapper--non-active')

                    votingResultsBlock.style.display = 'block'

                    let votes = data.votes.reduce((previousValue, currentValue) => previousValue + currentValue, 0)

                    resultItems.forEach((btn, index) => {
                        const currentVariantVotes = data.votes[index]
                        const resultItemIndicators = btn.querySelector('.state-inner')
                        const indicatorPercent = btn.querySelector('.state-inner__percent')
                        const indicatorQuantity = btn.querySelector('.state-inner__quantity')
                        const progressLine = btn.querySelector('.voting-result__line')
                        const individualPercentNum = Math.round(currentVariantVotes * 100 / votes)

                        showElement(resultItemIndicators)

                        indicatorPercent.innerHTML = individualPercentNum
                        indicatorQuantity.innerHTML = currentVariantVotes

                        setTimeout(() => progressLine.style.width = individualPercentNum + '%', 170)

                    })

                }, reason => {
                    rejectedMessage.style.display = 'block'
                    rejectedMessage.innerHTML = reason
                    currentPoll.appendChild(rejectedMessage)

                    submitVoteBtn.classList.remove('btn--non-active')

                    answerVariantsBlock.classList.remove('voting__variants-wrapper--filter-blur')

                    hideElement(preloader)

                })
        }
    }
}
votingBlock.addEventListener('click', voting)
