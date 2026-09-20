import React from 'react';
import '../styles/FileDropZone.css';

export function FileDropZone({ videoPath, fileName, onDrop, disabled }) {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div
      className={`drop-zone ${isDragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={onDrop}
    >
      {videoPath ? (
        <div className="file-info">
          <div className="file-icon">▶</div>
          <div className="file-details">
            <p className="file-name">{fileName}</p>
            <p className="file-path">{videoPath}</p>
          </div>
        </div>
      ) : (
        <div className="drop-content">
          <div className="drop-icon">⬇</div>
          <h2>Drop your video here</h2>
          <p>or click to browse</p>
        </div>
      )}
    </div>
  );
}
