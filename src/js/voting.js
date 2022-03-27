import { hideElement, showElement } from './helper'
import { openModal } from './modal';
import { sendPoll } from './server'

const votingBlock = document.querySelector('.voting-forms')
const rejectedModal = document.querySelector('.voting-modal')

let poll = {};

document.addEventListener('click', ({ target }) => {
    if (target.closest('.radio-input')) {
        poll = {
            pollId: target.closest('.voting-form').id,
            voteIndex: target.dataset.id
        }
    }
})

let voting = (e) => {
    if (e.target.closest('[data-id="vote-btn"]')) {
        const submitVoteBtn = e.target
        e.preventDefault();
        const currentPoll = e.target.closest('.voting')
        const currentPreloadLayer = e.target.closest('.preload-layer')

        const preloader = currentPreloadLayer.querySelector('.voting__preload')
        const votingBtns = currentPoll.querySelectorAll('.voting__progress')
        const answersVariants = currentPoll.querySelector('.variants-wrapper')
        const votingResult = currentPoll.querySelector('.voting__wrapper')
        const footerVotingBtns = currentPoll.querySelector('.discussion-wrapper')

        if (Object.keys(poll).length !== 0 && poll.pollId === e.target.closest('.voting-form').id) {
            submitVoteBtn.classList.add('btn--non-active')

            currentPoll.classList.add('voting--non-active')
            showElement(preloader)

            sendPoll(poll)
                .then(data => {
                    poll = {}
                    submitVoteBtn.setAttribute('disabled', 'disabled')

                    hideElement(preloader, answersVariants)
                    showElement(votingResult)

                    currentPoll.classList.remove('voting--non-active')
                    answersVariants.classList.add('variants-wrapper--non-active')

                    votingResult.style.display = 'block'

                    let votes = data.votes.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
                    votingBtns.forEach((btn, index) => {
                        let currentVariantVotes = data.votes[index]
                        let progressState = btn.querySelector('.voting__progress-state')
                        let percentEl = btn.querySelector('.voting__progress-percent')
                        let quantityEl = btn.querySelector('.voting__progress-quantity')
                        let progressLine = btn.querySelector('.voting__progress-line')
                        let percentNum = Math.round(currentVariantVotes * 100 / votes)

                        showElement(progressState)

                        percentEl.innerHTML = percentNum
                        quantityEl.innerHTML = currentVariantVotes

                        setTimeout(() => progressLine.style.width = percentNum + '%', 170)

                    })
                    showElement(footerVotingBtns)

                    footerVotingBtns.style.display = 'flex'
                }, reason => {
                    poll = {}

                    openModal('.voting-modal')

                    const message = document.querySelector('.voting-modal__message')
                    message.innerHTML = reason

                    submitVoteBtn.classList.remove('btn--non-active')

                    currentPoll.classList.remove('voting--non-active')

                    hideElement(preloader)

                })
        }
    }
}

votingBlock.addEventListener('click', voting)
