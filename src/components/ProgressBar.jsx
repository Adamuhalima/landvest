import React from 'react';
import '../styles/progress-bar.css';

/**
 * ProgressBar Component
 * Shows the percentage of fractions sold for a property
 * @param {number} percentage - Percentage sold (0-100)
 * @param {number} totalFractions - Total fractions available (usually 100)
 * @param {number} soldFractions - Number of fractions sold
 */
const ProgressBar = ({ percentage = 0, totalFractions = 100, soldFractions = 0 }) => {
  const displayPercentage = Math.min(Math.max(percentage, 0), 100);
  const investorCount = soldFractions; // Number of people invested

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <span className="progress-label">Investment Progress</span>
        <span className="progress-percentage">{displayPercentage.toFixed(0)}%</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${displayPercentage}%` }}
        >
          {displayPercentage > 15 && (
            <span className="progress-text">{displayPercentage.toFixed(0)}%</span>
          )}
        </div>
      </div>

      <div className="progress-bar-footer">
        <span className="sold-fractions">
          {soldFractions}/{totalFractions} fractions sold
        </span>
        <span className="available-fractions">
          {totalFractions - soldFractions} available
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
