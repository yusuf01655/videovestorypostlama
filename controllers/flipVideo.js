//Flip: Flip the video horizontally or vertically.
const child_process = require('child_process');

async function flipVideo(sourcePath, outputPath, direction) {
  try {
    
    if (!sourcePath || !outputPath || !direction) {
      throw new Error('Missing required arguments');
    }

    
    let filter;
    switch (direction) {
      case 'horizontal':
        filter = 'hflip';
        break;
      case 'vertical':
        filter = 'vflip';
        break;
      default:
        throw new Error('Unsupported flip direction');
    }

    const ffmpeg = child_process.spawn('ffmpeg', [
      '-i', sourcePath,
      '-filter:v', filter,
      '-c:v', 'copy',
      '-c:a', 'copy',
      outputPath
    ]);

    
    ffmpeg.stderr.on('data', (data) => {
      console.error('ffmpeg stderr:', data.toString());
    });

    
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        console.log(`Video flipped ${direction} successfully:`, outputPath);
      } else {
        console.error(`Error flipping video ${direction}`);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const sourcePath = './video.mp4';
const outputPath = './output.mp4';
const direction = 'horizontal'; // Flip horizontally

flipVideo(sourcePath, outputPath, direction);
