const yf = require('yahoo-finance');

const yahooFinanceController = {};

yahooFinanceController.getQuotes = async (req, res, next) => {
  if (!res.locals.user.portfolio) {
    return next();
  }
  const portfolio = [...res.locals.user.portfolio];
  const tickersArr = portfolio.map((el) => el.ticker);
  try {
    const final = await yf.quote({
      symbols: tickersArr,
      modules: ['price', 'summaryProfile'],
    });
    const portfolioAnalytics = [];
    for (let key in final) {
      portfolioAnalytics.push({
        ticker: key,
        price: final[key].price.regularMarketPrice,
        sector: final[key].summaryProfile.sector,
      });
    }
    // console.log(portfolioAnalytics);
    //need to fix naming especially for userModel schema shares instead of marketvalue
    const fullAnalytics = [];
    for (let i = 0; i < portfolio.length; i++) {
      for (let item of portfolioAnalytics) {
        if (portfolio[i].ticker === item.ticker) {
          fullAnalytics.push({
            ticker: portfolio[i].ticker,
            marketValue: Math.floor(item.price * portfolio[i].marketValue),
            sector: item.sector,
          });
          // res.locals.portfolio[i]['sector'] = item.sector;
        }
      }
    }
    // console.log(fullAnalytics);
    res.locals.analytics = fullAnalytics;
    return next();
  } catch (err) {
    return next({
      log: 'Error in yahooFinanceController.getQuotes',
      status: 400,
      message: {
        err: 'An error occurred while trying to fetch data from the finance api',
      },
    });
  }
};

module.exports = yahooFinanceController;
