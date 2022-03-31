import { hideElement, showElement } from './helper'
import { sendPoll } from './server'

function createVoting(formSelector) {
  const form = document.querySelector(formSelector)
  form.addEventListener('submit', submitHandler)

  function submitHandler(e) {
    e.preventDefault()
    const poll = form.querySelector('.voting')

    const answerVariantsBlock = poll.querySelector('.voting__variants-wrapper')
    const preloader = poll.querySelector('.voting__preload')
    const resultItems = poll.querySelectorAll('.voting-result')
    const votingResultsBlock = poll.querySelector('.voting__results-wrapper')
    const submitVoteBtn = poll.querySelector('[data-id="vote-btn"]')
    const rejectedMessage = document.querySelector('.voting-forms__error-message')
    submitVoteBtn.classList.add('btn--non-active')

    let pollData = {
      pollId: form.id,
      voteIndex: form.elements.voting.value
    }

    let setLoading = () => {

      answerVariantsBlock.classList.add('voting__variants-wrapper--filter-blur')
      showElement(preloader)
    }

    function unsetLoading() {
      answerVariantsBlock.classList.remove('voting__variants-wrapper--filter-blur')
      hideElement(preloader)
    }

    function showError(reason) {
      rejectedMessage.style.display = 'block'
      rejectedMessage.innerHTML = reason

      poll.appendChild(rejectedMessage)

      submitVoteBtn.classList.remove('btn--non-active')

      unsetLoading()
    }

    function hideError() {
      rejectedMessage.style.display = 'none'
      poll.removeChild(rejectedMessage)
    }

    function showResults(data) {
      unsetLoading()

      submitVoteBtn.setAttribute('disabled', 'disabled')

      hideElement(answerVariantsBlock)
      showElement(votingResultsBlock)

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

    }

    setLoading()

    if (poll.lastChild === rejectedMessage) {
      hideError()
    }

    sendPoll(pollData)
      .then(data => {
        showResults(data)

      }, reason => {
        showError(reason)
      })
  }
}

createVoting('#gold-medal-in-sport-2020')
createVoting('#place-championship-2020')