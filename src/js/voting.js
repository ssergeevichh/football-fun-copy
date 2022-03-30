import { hideElement, showElement } from './helper'
import { sendPoll } from './server'

const votingBlock = document.querySelector('.voting-forms')
const forms = document.querySelectorAll('.voting-form')
const rejectedMessage = document.querySelector('.voting-forms__error-message')


let poll = {};

votingBlock.addEventListener('change', ({ target }) => {
    poll = {
        pollId: target.closest('.voting-form').id,
        voteIndex: target.dataset.id
    }
})



let sendForm = (e) => {
    e.preventDefault();
    const currentForm = e.target
    const currentPoll = currentForm.querySelector('.voting')

    const submitVoteBtn = currentPoll.querySelector('[data-id="vote-btn"]')
    const resultItems = currentPoll.querySelectorAll('.voting-result')
    const answerVariantsBlock = currentPoll.querySelector('.voting__variants-wrapper')
    const preloader = currentPoll.querySelector('.voting__preload')
    const votingResultsBlock = currentPoll.querySelector('.voting__results-wrapper')
    const selectedVariantValue = currentForm.elements.voting.value

    let poll = {
        pollId: currentForm.id,
        voteIndex: selectedVariantValue
    }

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


forms.forEach(form => {
    form.addEventListener('submit', sendForm)
})
