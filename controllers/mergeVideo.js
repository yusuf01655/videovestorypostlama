const child_process = require('child_process');

async function mergeVideos(videoPaths, outputPath) {
  try {
    
    if (!videoPaths || !videoPaths.length || !outputPath) {
      throw new Error('Missing required arguments');
    }

   
    const filePath = `${outputPath}.txt`;
    await writeFile(filePath, videoPaths.join('\n'));

   
    const ffmpeg = child_process.spawn('ffmpeg', [
      '-f', 'concat',
      '-safe', '0',
      '-i', filePath,
      '-c', 'copy',
      outputPath
    ]);

   
    ffmpeg.stderr.on('data', (data) => {
      console.error('ffmpeg stderr:', data.toString());
    });

   
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        console.log('Videos merged successfully:', outputPath);
        unlink(filePath);
      } else {
        console.error('Error merging videos');
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}


async function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


const videoPaths = [
  './video1.mp4',
  './video2.mp4',
  './video3.mp4'
];
const outputPath = './merged_video.mp4';

mergeVideos(videoPaths, outputPath);
