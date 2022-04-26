const database = [
  {
    pollId: 'place-championship-2020',
    votes: [
      10,
      40,
      20,
      8,
    ],
  },
  {
    pollId: 'gold-medal-in-sport-2020',
    votes: [
      11,
      8,
    ],
  },
]

export function sendPoll({ pollId, voteIndex }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.4) {
        return reject(new Error('Something went wrong...'))
      }

      const poll = database.find(({ pollId: id }) => id === pollId)

      if (!poll) {
        return reject(new Error('No poll'))
      }

      poll.votes[voteIndex] += 1

      const response = {
        pollId,
        votes: poll.votes,
      }

      resolve(response)
    }, 2000)
  })
}
