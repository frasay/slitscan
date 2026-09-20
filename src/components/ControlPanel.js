import React from 'react';
import '../styles/ControlPanel.css';

export function ControlPanel({ settings, onSettingsChange, disabled }) {
  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="control-panel">
      <div className="control-group">
        <label htmlFor="slitWidth">
          Slit Width: <span className="value">{settings.slitWidth}px</span>
        </label>
        <input
          id="slitWidth"
          type="range"
          min="1"
          max="200"
          value={settings.slitWidth}
          onChange={(e) => handleChange('slitWidth', parseInt(e.target.value))}
          disabled={disabled}
          className="slider"
        />
      </div>

      <div className="control-group">
        <label htmlFor="slitPosition">
          Slit Position: <span className="value">{settings.slitPosition}%</span>
        </label>
        <input
          id="slitPosition"
          type="range"
          min="0"
          max="100"
          value={settings.slitPosition}
          onChange={(e) => handleChange('slitPosition', parseInt(e.target.value))}
          disabled={disabled}
          className="slider"
        />
      </div>

      <div className="control-group">
        <label htmlFor="direction">Direction</label>
        <select
          id="direction"
          value={settings.direction}
          onChange={(e) => handleChange('direction', e.target.value)}
          disabled={disabled}
          className="select"
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
        </select>
      </div>
    </div>
  );
}
