import currencyList from '../data/currencies.json'

export const shortDate = (date) => new Date(date || Date.now()).toISOString().substring(0, 10)
export const currencyFormatter = ({value}) => Number(value).toFixed(3)
export const getCurrencyName = ({row}) => currencyList?.[row.currency]?.name || row.currency