const helpers = require('../../helpers')

const getCurrencyByDate = (req, res) => {
  const {date} = req.params;
  const dateInputObject = helpers.dateStrValidation(date)
  const datePreviousDayString = helpers.getDatePreviousDay(dateInputObject)

  const currencyList = helpers.getCurrencies()
  if (!Object.entries(currencyList)?.length) return res.json([])

  const currencyListDate = currencyList[date] || {}
  const currencyListPreviousDay = currencyList[datePreviousDayString]
  if (!Object.entries(currencyListDate)?.length) return res.json([])

  const currencyResponse = []
  for (const currency of Object.keys(currencyListDate.rates)) {
    const rate = currencyListDate?.rates?.[currency] || 0
    const previousRate = currencyListPreviousDay?.rates?.[currency] || currencyListDate?.rates?.[currency] || 0
    const diff = rate - previousRate

    currencyResponse.push({
      currency,
      rate,
      diff
    })
  }

  res.json(currencyResponse)
};


const getAvailableCurencyDates = (req, res) => {
  const currencyList = helpers.getCurrencies()

  res.json(Object.keys(currencyList) || [])
};

module.exports = {
  getCurrencyByDate,
  getAvailableCurencyDates
}

