const currencyController = require('./controller')

module.exports = function (router) {
  router.get('/currency/available', currencyController.getAvailableCurencyDates);
  router.get('/currency/:date', currencyController.getCurrencyByDate);
}