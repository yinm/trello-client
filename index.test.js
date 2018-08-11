const aggregateTime = require('./index')

const textThirtyMinutes = '30minutes';
const textOneHour = '1hour'
const textTwoHours = '2hours'
const textThreeHours = '3hours'

test('there is one label for each', () => {
  const response = [
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
