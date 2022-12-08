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
        <li>Communication Services</li>
        <li>Consumer Cyclical</li>
        <li>Consumer Defensive</li>
        <li>Energy</li>
        <li>Financial Services</li>
        <li>Healthcare</li>
        <li>Industrials</li>
        <li>Information Technology</li>
        <li>Basic Materials</li>
        <li>Real Estate</li>
        <li>Utilities</li>
      </ul>
      <ul className={classes.diverseUl}>
        <li>
          {sectorCache['Communication Services']
            ? sectorCache['Communication Services']
            : 0}
          %
        </li>
        <li>
          {sectorCache['Consumer Cyclical']
            ? sectorCache['Consumer Cyclical']
            : 0}
          %
        </li>
        <li>
          {sectorCache['Consumer Defensive']
            ? sectorCache['Consumer Defensive']
            : 0}
          %
        </li>
        <li>{sectorCache['Energy'] ? sectorCache['Energy'] : 0}%</li>
        <li>
          {sectorCache['Financial Services']
            ? sectorCache['Financial Services']
            : 0}
          %
        </li>
        <li>{sectorCache['Healthcare'] ? sectorCache['Healthcare'] : 0}%</li>
        <li>{sectorCache['Industrials'] ? sectorCache['Industrials'] : 0}%</li>
        <li>
          {sectorCache['Information Technology']
            ? sectorCache['Information Technology']
            : 0}
        </li>
        <li>
          {sectorCache['Basic Materials'] ? sectorCache['Basic Materials'] : 0}%
        </li>
        <li>{sectorCache['Real Estate'] ? sectorCache['Real Estate'] : 0}%</li>
        <li>{sectorCache['Utilities'] ? sectorCache['Utilities'] : 0}%</li>
      </ul>
    </div>
  );
};

export default SectorDiversification;
