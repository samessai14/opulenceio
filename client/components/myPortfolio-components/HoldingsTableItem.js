import React from 'react';
import classes from './HoldingsTableItem.module.css';

const HoldingsTableItem = (props) => {
  return (
    <tr className={classes.tableItem}>
      <button
        className={classes.tableItemTickerBtn}
        onClick={props.onClick}
        id={props.ticker}
      >
        {props.ticker}
      </button>
      <td className={classes.tableItemTD}>${props.marketValue.toFixed(2)}</td>
    </tr>
  );
};

export default HoldingsTableItem;
