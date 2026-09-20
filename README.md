# Slit Scan Video Processor

A professional slit-scan video effect processor built with Electron and React. Create mesmerizing time-distortion effects by scanning vertical or horizontal slits through your video frames.

## Features

✅ **Drag-and-drop video import** - Simply drop your video onto the app
✅ **Adjustable slit width** - Fine-tune the width of your scanning slit (1-200px)
✅ **Adjustable slit position** - Control where the slit scans (0-100%)
✅ **Horizontal & vertical modes** - Choose your scan direction
✅ **Real-time progress tracking** - Watch the rendering progress
✅ **Clean, minimalist UI** - Inspired by Braun and Apple design
✅ **Native file dialogs** - Save to any location on your computer
✅ **Cross-platform** - Works on Windows, Mac, and Linux

## Installation

### Requirements
- Node.js 14+ ([download here](https://nodejs.org/))
- FFmpeg installed on your system

### Setup

1. Clone the repository:
```bash
git clone https://github.com/frasay/slitscan.git
cd slitscan
```

2. Install dependencies:
```bash
npm install
```

3. Install required system dependencies:

**macOS (using Homebrew):**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt-get install ffmpeg
```

**Windows:**
Download from [ffmpeg.org](https://ffmpeg.org/download.html) or use:
```bash
choco install ffmpeg
```

## Running the App

### Development Mode
```bash
npm start
```
This starts both the React development server and Electron in parallel.

### Build for Distribution
```bash
npm run build
```
This creates optimized builds for your platform.

## How to Use

1. **Load a video**: Drag and drop a video file onto the drop zone (or click to browse)
2. **Adjust settings**:
   - **Slit Width**: How many pixels wide the scanning slit is
   - **Slit Position**: Where vertically/horizontally to scan (as a percentage)
   - **Direction**: Choose between vertical or horizontal scanning
3. **Process**: Click the "Run" button
4. **Save**: Choose where to save your output MP4 file
5. **Watch**: The progress bar shows rendering progress

## How Slit Scan Works

Slit scanning is a creative video technique that extracts a thin vertical or horizontal slice from each frame of video and stacks them together over time. This creates a time-distorted, often surreal effect where motion is compressed or elongated in unusual ways.

The effect is popular in experimental and artistic video, and creates a unique perspective on movement and time.

## Supported Video Formats

- MP4
- MOV (QuickTime)
- AVI
- MKV (Matroska)
- WebM

## System Requirements

- **macOS**: 10.10+
- **Windows**: 7+
- **Linux**: Most modern distributions
- **RAM**: 4GB minimum (8GB+ recommended for processing longer videos)
- **Storage**: Enough space for your source video + output file

## Keyboard Shortcuts

- `Cmd/Ctrl + Q` - Quit application
- `Cmd/Ctrl + R` - Reload window (dev mode)

## License

MIT

## Credits

Built with love using:
- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [FFmpeg](https://ffmpeg.org/)
