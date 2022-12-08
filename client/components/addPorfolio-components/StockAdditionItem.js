import React from 'react';
import Card from '../UI/Card';
import classes from './StockAdditionItem.module.css';

const StockAdditionItem = (props) => {
  return (
    // <li>
    <form className={classes.stockAdditionItemForm} onSubmit={props.onSubmit}>
      <input
        className={classes.stockAdditionItemInput}
        type="text"
        name="TICKER"
        placeholder="TICKER"
      />
      <input
        className={classes.stockAdditionItemInput}
        type="Number"
        name="QUANTITY"
        placeholder="SHARES"
      />
      <button className={classes.stockAdditionItemButton} type="submit">
        +
      </button>
    </form>
    // </li>
  );
};

export default StockAdditionItem;
