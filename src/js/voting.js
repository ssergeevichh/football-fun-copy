import { hideElement, showElement } from './helper'
import { sendPoll } from './server'




function createVoting(formSelector) {
  const form = document.querySelector(formSelector)
  const poll = form.querySelector('.poll')

  const answerVariantsBlock = poll.querySelector('.voting__variants-wrapper')
  const preloader = poll.querySelector('.voting__preload')
  const resultItems = poll.querySelectorAll('.poll-result')
  const votingResultsBlock = poll.querySelector('.voting__results-wrapper')
  const submitVoteBtn = poll.querySelector('[data-id="vote-btn"]')

  /**
   * Show poll results
   * @param {object} data - data from server
   */
  
  function showResults(data) {
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
      const progressLine = btn.querySelector('.poll-result__line')
      const individualPercentNum = Math.round(currentVariantVotes * 100 / votes)

      showElement(resultItemIndicators)

      indicatorPercent.innerHTML = individualPercentNum
      indicatorQuantity.innerHTML = currentVariantVotes

      setTimeout(() => progressLine.style.width = individualPercentNum + '%', 170)

    })

  }

  /**
   * Show preloader
   * @param {boolean} value 
   */

  function setLoading(value) {
    if (value) {
      answerVariantsBlock.classList.add('voting__variants-wrapper--filter-blur')
      showElement(preloader)

      submitVoteBtn.classList.add('btn--non-active')
    } else {
      answerVariantsBlock.classList.remove('voting__variants-wrapper--filter-blur')
      hideElement(preloader)

      submitVoteBtn.classList.remove('btn--non-active')
    }
  }

  /**
 * Shows or hides error message
 * @param {string | null} reason - reason of error 
 */

  function showError(reason) {
    const rejectedMessage = document.querySelector('.poll-forms__error-message')
    if (reason) {
      rejectedMessage.innerHTML = reason
      rejectedMessage.style.display = 'block'
      poll.appendChild(rejectedMessage)
    }
    else if (poll.lastChild === rejectedMessage) {
      rejectedMessage.style.display = 'none'
      poll.removeChild(rejectedMessage)
    }

  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    submitVoteBtn.setAttribute('disabled', 'disabled')

    let pollData = {
      pollId: form.id,
      voteIndex: form.elements.poll.value
    }

    setLoading(true)
    showError(null)

    sendPoll(pollData)
      .then(data => {

        setLoading(false)
        showResults(data)

      })
      .catch(reason => {
        submitVoteBtn.removeAttribute('disabled', 'disabled')

        setLoading(false)
        showError(reason)
      })
  })
}

createVoting('#gold-medal-in-sport-2020')
createVoting('#place-championship-2020')

