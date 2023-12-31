const child_process = require('child_process');

async function cropVideo(sourcePath, outputPath, width, height, xOffset, yOffset) {
  try {
    
    if (!sourcePath || !outputPath || !width || !height || !xOffset || !yOffset) {
      throw new Error('Missing required arguments');
    }

    const ffmpeg = child_process.spawn('ffmpeg', [
      '-i', sourcePath,
      '-filter:v', `crop=${width}:${height}:${xOffset}:${yOffset}`,
      '-c:v', 'copy',
      '-c:a', 'copy',
      outputPath
    ]);

    
    ffmpeg.stderr.on('data', (data) => {
      console.error('ffmpeg stderr:', data.toString());
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        console.log('Video cropped successfully:', outputPath);
      } else {
        console.error('Error cropping video');
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const sourcePath = './video.mp4';
const outputPath = './output.mp4';
const width = 320;
const height = 240;
const xOffset = 50; 
const yOffset = 100; 

cropVideo(sourcePath, outputPath, width, height, xOffset, yOffset);
