import React from 'react';
import classes from './SectorDiversification.module.css';

const SectorDiversification = (props) => {
  const totalMarketValue = props.portfolio.reduce((acc, init) => {
    return acc + init.marketValue;
  }, 0);
  const sectorCache = {};
  props.portfolio.forEach((el) => {
    if (sectorCache[el.sector]) {
      sectorCache[el.sector] = Math.floor(
        ((sectorCache[el.sector] + el.marketValue) / totalMarketValue) * 100
      ).toFixed(2);
    } else {
      sectorCache[el.sector] = Math.floor(
        (el.marketValue / totalMarketValue) * 100
      ).toFixed(2);
    }
  });
  console.log(
    'in diversification:',
    props.portfolio,
    totalMarketValue,
    sectorCache
  );

  return (
    <div className={classes.diverseContainer}>
      <ul className={classes.diverseUl}>
        <li className={classes.diverseLi}>Communication Services</li>
        <li className={classes.diverseLi}>Consumer Cyclical</li>
        <li className={classes.diverseLi}>Consumer Defensive</li>
        <li className={classes.diverseLi}>Energy</li>
        <li className={classes.diverseLi}>Financial Services</li>
        <li className={classes.diverseLi}>Healthcare</li>
        <li className={classes.diverseLi}>Industrials</li>
        <li className={classes.diverseLi}>Information Technology</li>
        <li className={classes.diverseLi}>Basic Materials</li>
        <li className={classes.diverseLi}>Real Estate</li>
        <li className={classes.diverseLi}>Utilities</li>
      </ul>
      <ul className={classes.diverseUl}>
        <li className={classes.diverseLi}>
          {sectorCache['Communication Services']
            ? sectorCache['Communication Services']
            : 0}
          %
        </li>
        <li className={classes.diverseLi}>
          {sectorCache['Consumer Cyclical']
            ? sectorCache['Consumer Cyclical']
            : 0}
          %
        </li>
        <li className={classes.diverseLi}>
          {sectorCache['Consumer Defensive']
            ? sectorCache['Consumer Defensive']
            : 0}
          %
        </li>
        <li className={classes.diverseLi}>
          {sectorCache['Energy'] ? sectorCache['Energy'] : 0}%
        </li>
        <li className={classes.diverseLi}>
          {sectorCache['Financial Services']
            ? sectorCache['Financial Services']
            : 0}
          %
        </li>
        <li className={classes.diverseLi}>
          {sectorCache['Healthcare'] ? sectorCache['Healthcare'] : 0}%
        </li>
        <li className={classes.diverseLi}>
          {sectorCache['Industrials'] ? sectorCache['Industrials'] : 0}%
        </li>
        <li className={classes.diverseLi}>
          {sectorCache['Information Technology']
            ? sectorCache['Information Technology']
            : 0}
        </li>
        <li className={classes.diverseLi}>
          {sectorCache['Basic Materials'] ? sectorCache['Basic Materials'] : 0}%
        </li>
        <li className={classes.diverseLi}>
          {sectorCache['Real Estate'] ? sectorCache['Real Estate'] : 0}%
        </li>
        <li className={classes.diverseLi}>
          {sectorCache['Utilities'] ? sectorCache['Utilities'] : 0}%
        </li>
      </ul>
    </div>
  );
};

export default SectorDiversification;
