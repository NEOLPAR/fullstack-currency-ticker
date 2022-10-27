import * as helpers from './index'

describe('shortDate helper', () => {
  test("shortDate no param should return today", async () => {
    const actual = helpers.shortDate()
    const expected = new Date().toISOString().substring(0, 10)

    expect(actual).toStrictEqual(expected)
  });

  test("shortDate no param should return format YYYY-MM-DD", async () => {
    const actual = helpers.shortDate('2017-01-04')
    const expected = '2017-01-04'

    expect(actual).toStrictEqual(expected)
  });
})