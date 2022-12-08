import React from 'react';
import classes from './HoldingsTableItem.module.css';

const HoldingsTableItem = (props) => {
  return (
    <tr className={classes.tableItem}>
      <td className={classes.tableItemTD}>{props.ticker}</td>
      <td className={classes.tableItemTD}>${props.marketValue.toFixed(2)}</td>
    </tr>
  );
};

export default HoldingsTableItem;
