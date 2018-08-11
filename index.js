require('dotenv').config()

const request = require('request-promise')

const API_KEY = process.env.API_KEY
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const LIST_ID = process.env.LIST_ID
const API_URL = `https://api.trello.com/1/lists/${LIST_ID}/cards?key=${API_KEY}&token=${ACCESS_TOKEN}`

request.get(API_URL)
  .then(response => {
    const res = JSON.parse(response)
    render(aggregateTime(res))
  })
  .catch(error => {
    console.log(error)
  })

/**
 * @param {Object} response
 * @returns {Object}
 */
function aggregateTime(response) {
  const textThirtyMinutes = '30minutes';
  const textOneHour = '1hour'
  const textTwoHours = '2hours'
  const textThreeHours = '3hours'

  let total = 0
  let thirtyMinutes = 0
  let oneHour = 0
  let twoHours = 0
  let threeHours = 0
  let noLabel = 0
  let whatsHappen = 0

  for (let card of response) {
    if (card.labels[0] === undefined) {
      noLabel++
      continue
    }

    switch (card.labels[0].name) {
      case textThirtyMinutes:
        thirtyMinutes++
        total += 0.5
        break
      case textOneHour:
        oneHour++
        total += 1
        break
      case textTwoHours:
        twoHours++
        total += 2
        break
      case textThreeHours:
        threeHours++
        total += 3
        break
      default:
        whatsHappen++
    }
  }

  return {
    'total': total,
    [textThirtyMinutes]: thirtyMinutes,
    [textOneHour]: oneHour,
    [textTwoHours]: twoHours,
    [textThreeHours]: threeHours,
    'no label': noLabel,
    "what's happen!!!": whatsHappen,
  }
}

function render(object) {
  for (let key of Object.keys(object)) {
    console.log(key, object[key])
  }
}
