const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const { EventEmitter } = require('events');

class SlitScanProcessor extends EventEmitter {
  constructor({ videoPath, slitWidth, slitPosition, direction }) {
    super();
    this.videoPath = videoPath;
    this.slitWidth = slitWidth; // pixels
    this.slitPosition = slitPosition; // 0-100 (percentage of width)
    this.direction = direction; // 'horizontal' or 'vertical'
  }

  async process(outputPath) {
    return new Promise((resolve, reject) => {
      const ffmpegCommand = ffmpeg(this.videoPath);

      // Create complex slit-scan effect using ffmpeg filters
      const filterComplex = this.buildFilterComplex();

      ffmpegCommand
        .outputOptions('-c:v', 'libx264')
        .outputOptions('-preset', 'medium')
        .outputOptions('-crf', '18')
        .complexFilter(filterComplex)
        .on('progress', (progress) => {
          const percent = Math.round((progress.frames / this.totalFrames) * 100);
          this.emit('progress', percent);
        })
        .on('error', (err) => {
          reject(new Error(`FFmpeg error: ${err.message}`));
        })
        .on('end', () => {
          resolve(outputPath);
        })
        .save(outputPath);
    });
  }

  buildFilterComplex() {
    // This creates a vertical slit effect that scans across the frame
    // Adjustable based on slitWidth and slitPosition
    const slitPixels = Math.max(1, Math.floor(this.slitWidth));
    const positionPixels = this.slitPosition;

    if (this.direction === 'horizontal') {
      // Horizontal slit: extracts a horizontal line and stretches it vertically
      return `crop=w=iw:h=${slitPixels}:x=0:y=${positionPixels},scale=iw:ih`;
    } else {
      // Vertical slit: extracts a vertical line and stretches it horizontally
      return `crop=w=${slitPixels}:h=ih:x=${positionPixels}:y=0,scale=iw:ih`;
    }
  }
}

module.exports = { SlitScanProcessor };
