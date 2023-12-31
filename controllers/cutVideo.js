const child_process = require('child_process');

async function cutVideo(sourcePath, outputPath, segments) {
  try {
    // Validate input
    if (!sourcePath || !outputPath || !segments || !segments.length) {
      throw new Error('Missing required arguments');
    }

    // Loop through segments and spawn ffmpeg processes
    for (const segment of segments) {
      const startTime = segment.startTime;
      const endTime = segment.endTime;
      const outputSegmentPath = `${outputPath}-${segment.index}.mp4`;

      const ffmpeg = child_process.spawn('ffmpeg', [
        '-i', sourcePath,
        '-ss', startTime,
        '-to', endTime,
        '-c:v', 'copy',
        '-c:a', 'copy',
        outputSegmentPath
      ]);

      // Listen for ffmpeg errors
      ffmpeg.stderr.on('data', (data) => {
        console.error('ffmpeg stderr:', data.toString());
      });

      // Log completion for each segment
      ffmpeg.on('close', (code) => {
        if (code === 0) {
          console.log(`Segment ${segment.index} cut successfully: ${outputSegmentPath}`);
        } else {
          console.error(`Error cutting segment ${segment.index}`);
        }
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example usage
const sourcePath = './video.mp4';
const outputPath = './output';
const segments = [
  { startTime: '00:00:00', endTime: '00:00:30', index: 1 },
  { startTime: '00:00:30', endTime: '00:01:00', index: 2 },
];

cutVideo(sourcePath, outputPath, segments);
