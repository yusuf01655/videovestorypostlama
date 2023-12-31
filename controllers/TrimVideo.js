
const ffmpeg = require('fluent-ffmpeg');



const inputPath = 'public/videos/input.mp4';


const video = ffmpeg(inputPath);



const startTime = 10;
const endTime = 20;


video.setStartTime(startTime)
    .setDuration(endTime - startTime)
    .save('output61220232046.mp4')
    .on('end', () => {
        console.log('Video successfully trimmed!');
    })
    .on('error', (err) => {
        console.error('Error trimming video in routes>trimVideo.js ', err);
    });