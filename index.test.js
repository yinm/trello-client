const aggregateTime = require('./index')

const textThirtyMinutes = '30minutes';
const textOneHour = '1hour'
const textTwoHours = '2hours'
const textThreeHours = '3hours'

describe('has one or more cards', () => {
  let response

  beforeEach(() => {
    response = [
      {
        labels: [
          {
            name: textThirtyMinutes,
          },
        ],
      },
      {
        labels: [
          {
            name: textOneHour,
          },
        ],
      },
      {
        labels: [
          {
            name: textTwoHours,
          },
        ],
      },
      {
        labels: [
          {
            name: textThreeHours,
          },
        ],
      },
      {
        labels: [
          // no labels
        ]
      }
    ]
  })

  test('there is one label for each', () => {
    const expected = {
      'total': 6.5,
      [textThirtyMinutes]: 1,
      [textOneHour]: 1,
      [textTwoHours]: 1,
      [textThreeHours]: 1,
      'no label': 1,
      "what's happen!!!": 0,
    }

    expect(aggregateTime(response)).toEqual(expected)
  })

  test('there is two labels for each', () => {
    response = response.concat(response)

    const expected = {
      'total': 13,
      [textThirtyMinutes]: 2,
      [textOneHour]: 2,
      [textTwoHours]: 2,
      [textThreeHours]: 2,
      'no label': 2,
      "what's happen!!!": 0,
    }

    expect(aggregateTime(response)).toEqual(expected)
  })
})

test('no card', () => {
  const response = []

  const expected = {
    'total': 0,
    [textThirtyMinutes]: 0,
    [textOneHour]: 0,
    [textTwoHours]: 0,
    [textThreeHours]: 0,
    'no label': 0,
    "what's happen!!!": 0,
  }

  expect(aggregateTime(response)).toEqual(expected)
})
