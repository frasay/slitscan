import React from 'react';
import '../styles/ProgressBar.css';

export function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-text">{progress}%</p>
    </div>
  );
}
