const currencyDataJson = require('../../data/currencies.json')

module.exports.dateStrValidation = ( dateStr ) => {
  const [ year, month, day ] = dateStr.split('-');

  if ( !year || !month || !day ) {
    throw new Error('Date param is wrong')
  }

  const date = new Date(dateStr)

  if ( date.getFullYear() !== parseInt(year) || date.getMonth() + 1 !== parseInt(month) || date.getDate() !== parseInt(day) ) {
    throw new Error('Date has wrong format')
  }

  return date
}

module.exports.getDatePreviousDay = ( dateInput ) => {
  const datePreviousDay = new Date(new Date(dateInput).setDate(dateInput.getDate() - 1))
  const monthString = ( '0' + ( datePreviousDay.getMonth() + 1 ) ).substring(0, 2)
  const dayString = ( '0' + datePreviousDay.getDate()).substring(0, 2)

  return `${datePreviousDay.getFullYear()}-${monthString}-${dayString}`
}

module.exports.getCurrencies = () => {
  return currencyDataJson
}