const aggregateTime = require('../index')

const textTotal = 'total'
const textThirtyMinutes = '30minutes';
const textOneHour = '1hour'
const textTwoHours = '2hours'
const textThreeHours = '3hours'
const textNoLabel = 'no label'
const textOtherLabels = 'other labels'

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
      [textTotal]: 6.5,
      [textThirtyMinutes]: 1,
      [textOneHour]: 1,
      [textTwoHours]: 1,
      [textThreeHours]: 1,
      [textNoLabel]: 1,
      [textOtherLabels]: 0,
    }

    expect(aggregateTime(response)).toEqual(expected)
  })

  test('there is two labels for each', () => {
    response = response.concat(response)

    const expected = {
      [textTotal]: 13,
      [textThirtyMinutes]: 2,
      [textOneHour]: 2,
      [textTwoHours]: 2,
      [textThreeHours]: 2,
      [textNoLabel]: 2,
      [textOtherLabels]: 0,
    }

    expect(aggregateTime(response)).toEqual(expected)
  })

  test('has other labels', () => {
    response = response.concat([
      {
        labels: [
          {
            name: 'other_labels',
          },
        ],
      },
    ])

    const expected = {
      [textTotal]: 6.5,
      [textThirtyMinutes]: 1,
      [textOneHour]: 1,
      [textTwoHours]: 1,
      [textThreeHours]: 1,
      [textNoLabel]: 1,
      [textOtherLabels]: 1,
    }

    expect(aggregateTime(response)).toEqual(expected)

  })
})

describe('has two or more labels for a card', () => {
  const response = [
    {
      labels: [
        { name: textThirtyMinutes,},
        { name: textOneHour }
      ],
    },
    {
      labels: [
        { name: textThirtyMinutes,},
        { name: textTwoHours }
      ],
    }
  ]

  test('aggregate all labels', () => {
    const expected = {
      [textTotal]: 4,
      [textThirtyMinutes]: 2,
      [textOneHour]: 1,
      [textTwoHours]: 1,
      [textThreeHours]: 0,
      [textNoLabel]: 0,
      [textOtherLabels]: 0,
    }

    expect(aggregateTime(response)).toEqual(expected)
  })
})

test('no card', () => {
  const response = []

  const expected = {
    [textTotal]: 0,
    [textThirtyMinutes]: 0,
    [textOneHour]: 0,
    [textTwoHours]: 0,
    [textThreeHours]: 0,
    [textNoLabel]: 0,
    [textOtherLabels]: 0,
  }

  expect(aggregateTime(response)).toEqual(expected)
})
