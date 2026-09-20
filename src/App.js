import React, { useState, useRef } from 'react';
import { FileDropZone } from './components/FileDropZone';
import { ControlPanel } from './components/ControlPanel';
import { ProgressBar } from './components/ProgressBar';
import './styles/App.css';

function App() {
  const [videoPath, setVideoPath] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState({
    slitWidth: 2,
    slitPosition: 50,
    direction: 'vertical',
  });

  // Listen for progress updates
  React.useEffect(() => {
    window.electronAPI.onProgress((data) => {
      setProgress(data);
    });
  }, []);

  const handleVideoDrop = async (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setVideoPath(file.path);
      setFileName(file.name);
    }
  };

  const handleProcessVideo = async () => {
    if (!videoPath) {
      alert('Please select a video file');
      return;
    }

    const result = await window.electronAPI.selectOutputPath();
    if (result.canceled) return;

    setIsProcessing(true);
    setProgress(0);

    const response = await window.electronAPI.processVideo({
      videoPath,
      slitWidth: settings.slitWidth,
      slitPosition: settings.slitPosition,
      direction: settings.direction,
      outputPath: result.filePath,
    });

    setIsProcessing(false);

    if (response.success) {
      alert(`Video processed successfully!\nSaved to: ${response.file}`);
    } else {
      alert(`Error: ${response.error}`);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Slit Scan</h1>
        <p className="subtitle">Professional video effect processor</p>
      </header>

      <div className="app-container">
        <FileDropZone
          videoPath={videoPath}
          fileName={fileName}
          onDrop={handleVideoDrop}
          disabled={isProcessing}
        />

        <ControlPanel
          settings={settings}
          onSettingsChange={setSettings}
          disabled={isProcessing}
        />

        {isProcessing && (
          <ProgressBar progress={progress} />
        )}

        <button
          className="process-button"
          onClick={handleProcessVideo}
          disabled={!videoPath || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Run'}
        </button>
      </div>
    </div>
  );
}

export default App;
