require('dotenv').config()

const request = require('request-promise')

const API_KEY = process.env.API_KEY
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const LIST_ID = process.env.LIST_ID
const LIST_ID_OKR = process.env.LIST_ID_OKR
const API_URL = `https://api.trello.com/1/lists/${LIST_ID}/cards?key=${API_KEY}&token=${ACCESS_TOKEN}`
const API_URL_OKR = `https://api.trello.com/1/lists/${LIST_ID_OKR}/cards?key=${API_KEY}&token=${ACCESS_TOKEN}`

async function main() {
  try {
    console.log('OKR -------------------------')
    const okr = await request.get(API_URL_OKR)
    render(aggregateTime(JSON.parse(okr)))

    console.log('')
    console.log('Backlog -------------------------')

    const backlog = await request.get(API_URL)
    render(aggregateTime(JSON.parse(backlog)))
  } catch (e) {
    console.log(e)
  }
}

main()

/**
 * @param {Object} response
 * @returns {Object}
 */
function aggregateTime(response) {
  const textTotal = 'total'
  const textThirtyMinutes = '30minutes';
  const textOneHour = '1hour'
  const textTwoHours = '2hours'
  const textThreeHours = '3hours'
  const textFiveHours = '5hours'
  const textNoLabel = 'no label'
  const textOtherLabels = 'other labels'

  let total = 0
  let thirtyMinutes = 0
  let oneHour = 0
  let twoHours = 0
  let threeHours = 0
  let fiveHours = 0
  let noLabel = 0
  let otherLabels = 0

  for (let card of response) {
    if (card.labels[0] === undefined) {
      noLabel++
      continue
    }

    card.labels.forEach(label => {
      switch (label.name) {
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
        case textFiveHours:
          fiveHours++
          total += 5
          break
        default:
          otherLabels++
      }
    })
  }

  return {
    [textTotal]: total,
    [textThirtyMinutes]: thirtyMinutes,
    [textOneHour]: oneHour,
    [textTwoHours]: twoHours,
    [textThreeHours]: threeHours,
    [textFiveHours]: fiveHours,
    [textNoLabel]: noLabel,
    [textOtherLabels]: otherLabels,
  }
}

function render(object) {
  for (let key of Object.keys(object)) {
    console.log(key, object[key])
  }
}

module.exports = aggregateTime
