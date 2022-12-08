import React from 'react';
import classes from './CurrentHoldingsTable.module.css';
import HoldingsTableItem from './HoldingsTableItem';

const CurrentHoldingsTable = (props) => {
  let totalMarketValue = 0;
  const holdingsArr = props.portfolio.map((holding, i) => {
    totalMarketValue += holding.marketValue;
    return (
      <HoldingsTableItem
        ticker={holding.ticker}
        marketValue={holding.marketValue}
        key={i + 1000}
      />
    );
  });

  return (
    <table className={props.className}>
      <tr className={classes.tableHead}>
        <th className={classes.tableHeadTH}>Stock Ticker</th>
        <th className={classes.tableHeadTH}>Market Value</th>
      </tr>
      {holdingsArr}
      <tr className={classes.totalSumRow}>
        <td className={classes.totalSumRowTD}>Total</td>
        <td className={classes.totalSumRowTD}>
          ${totalMarketValue.toFixed(2)}
        </td>
      </tr>
    </table>
  );
};

export default CurrentHoldingsTable;
