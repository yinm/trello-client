require('dotenv').config()

const request = require('request-promise')

const API_KEY = process.env.API_KEY
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const LIST_ID = process.env.LIST_ID
const API_URL = `https://api.trello.com/1/lists/${LIST_ID}/cards?key=${API_KEY}&token=${ACCESS_TOKEN}`

request.get(API_URL)
  .then(response => {
    const res = JSON.parse(response)
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

    for (let card of res) {
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
    console.log('total' , total)
    console.log('------------------------')
    console.log(textThirtyMinutes, thirtyMinutes)
    console.log(textOneHour, oneHour)
    console.log(textTwoHours, twoHours)
    console.log(textThreeHours, threeHours)
    console.log('no label', noLabel)
    console.log("what's happen!!!", whatsHappen)
  })
  .catch(error => {
    console.log(error)
  })
