import React from 'react';
import Card from '../UI/Card';
import classes from './StockListItem.module.css';

const StockListItem = (props) => {
  return (
    <div className={classes.stockListItem}>
      <div className={classes.stockListSubItem}>Ticker: {props.ticker}</div>
      <div className={classes.stockListSubItem}>Shares: {props.shares}</div>
      <button className={classes.stockListButton}>Remove</button>
    </div>
  );
};

export default StockListItem;
