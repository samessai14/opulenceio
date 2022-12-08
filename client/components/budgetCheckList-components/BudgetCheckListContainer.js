import React from 'react';
import Card from '../UI/Card';
import classes from './BudgetCheckList.module.css';
import BudgetNecessacities from './BudgetNecessacities';

const BudgetCheckListContainer = (props) => {
  return (
    <Card>
      <div className={classes.budgetContainer}>
        <h1 className={classes.budgetContainerH1}>Monthly Budget Checklist</h1>
        <BudgetNecessacities className={classes.necessities} />
      </div>
    </Card>
  );
};

export default BudgetCheckListContainer;
