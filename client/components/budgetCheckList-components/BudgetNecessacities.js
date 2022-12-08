import React from 'react';
import classes from './BudgetNecessacities.module.css';

const BudgetNecessacities = (props) => {
  return (
    <div className={classes.necessaryItemsContainer}>
      <div className={classes.necessaryItem}>
        <p className={classes.necessaryItemInput}>Housing $1,200.00</p>
        <input type="checkbox" className={classes.checkBox} />
      </div>
      <div className={classes.necessaryItem}>
        <p className={classes.necessaryItemInput}>Utilities : $500.00</p>
        <input type="checkbox" className={classes.checkBox} />
      </div>
      <div className={classes.necessaryItem}>
        <p className={classes.necessaryItemInput}>Food : $500.00</p>
        <input type="checkbox" className={classes.checkBox} />
      </div>
      <div className={classes.necessaryItem}>
        <p className={classes.necessaryItemInput}>Childcare : $800.00</p>
        <input type="checkbox" className={classes.checkBox} />
      </div>
      <div className={classes.necessaryItem}>
        <p className={classes.necessaryItemInput}>Subscriptions : $200.00</p>
        <input className={classes.checkBox} type="checkbox" />
      </div>
    </div>
  );
};

export default BudgetNecessacities;
