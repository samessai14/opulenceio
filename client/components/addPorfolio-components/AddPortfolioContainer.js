import React from 'react';
import classes from './AddPortfolioContainer.module.css';
import AddHoldingsList from './AddHoldingsList';
import Button from '../UI/Button';
import Card from '../UI/Card';

const AddPortfolioContainer = (props) => {
  return (
    <Card>
      <div className={`${classes['add-portfolio--container']}`}>
        <h1 className={classes.addPortfolioH1}>ADD A PORTFOLIO</h1>
        <AddHoldingsList
          onSubmit={props.update}
          newPortfolio={props.newPortfolio}
        />
        <Button
          className={classes.savePortfolioBtn}
          onClick={props.onSubmitPortfolio}
        >
          SAVE PORTFOLIO
        </Button>
      </div>
    </Card>
  );
};

export default AddPortfolioContainer;
