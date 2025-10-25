/* The streaming platform you work for is starting to have more and more users!
Because of this, popular series are being watched more and more, and the servers can't keep up!
Implement a caching mechanism in the playVideo method that uses closures to store in memory the number of pixels from each frame.

On the first call for a specific frame, you will call the getFrameFromDatabase method to extract the number from the database.
However, on the next call for the same frame, you must return the number of pixels loaded previously without calling the getFrameFromDatabase method again
*/
const playVideo = () => {};

const getFrameFromDatabase = (frame) => {
  return Math.floor(Math.random() * frame * 10000);
};

const MediaPlayer = playVideo();
console.log(MediaPlayer(2));
console.log(MediaPlayer(4));
console.log(MediaPlayer(2));
