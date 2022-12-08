import React from 'react';
import CurrentHoldingsTable from './CurrentHoldingsTable';
import classes from './MyPortfolioContainer.module.css';
import Card from '../UI/Card';
import SectorDiversification from './SectorDiversification';

const MyPortfolioContainer = (props) => {
  let portfolio;
  if (props.analytics.length > 0) {
    portfolio = props.analytics;
  } else portfolio = [];
  return (
    <Card>
      <div className={`${classes['my-portfolio--container']}`}>
        <h1 className={classes.myPortfolioTitleH1}>MY PORTFOLIO</h1>
        <CurrentHoldingsTable
          className={classes.holdingsTableInGrid}
          portfolio={portfolio}
        />
        <SectorDiversification
          className={classes.sectorsInGrid}
          portfolio={portfolio}
        />
      </div>
    </Card>
  );
};

export default MyPortfolioContainer;
