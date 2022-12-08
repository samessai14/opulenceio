import React from 'react';
import classes from './AddHoldingsList.module.css';
import StockListItem from './StockListItem';
import Button from '../UI/Button';
import StockAdditionItem from './StockAdditionItem';
const AddHoldingsList = (props) => {
  let entries = [];
  if (props.newPortfolio) {
    entries = props.newPortfolio.map((el, i) => {
      return (
        <StockListItem
          ticker={el.ticker}
          shares={el.marketValue}
          key={i * 1000}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <ul>
        {entries}
        <StockAdditionItem onSubmit={props.onSubmit} />
      </ul>
      {/* <Button className={classes.addHoldingBtn}>+ ADD</Button> */}
    </React.Fragment>
  );
};

export default AddHoldingsList;
