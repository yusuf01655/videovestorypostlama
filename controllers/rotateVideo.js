const child_process = require('child_process');

async function rotateVideo(sourcePath, outputPath, degrees) {
  try {
    // Validate input
    if (!sourcePath || !outputPath || !degrees) {
      throw new Error('Missing required arguments');
    }

    let filter;
    switch (degrees) {
      case 90:
        filter = 'transpose=1';
        break;
      case 180:
        filter = 'transpose=2';
        break;
      case 270:
        filter = 'transpose=3';
        break;
      default:
        throw new Error('Unsupported rotation angle');
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
        console.log(`Video rotated by ${degrees} degrees successfully:`, outputPath);
      } else {
        console.error(`Error rotating video by ${degrees} degrees`);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}


const sourcePath = './video.mp4';
const outputPath = './output.mp4';
const degrees = 90;

rotateVideo(sourcePath, outputPath, degrees);
