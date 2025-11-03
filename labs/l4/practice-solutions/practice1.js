const playVideo = () => {
  const cache = {};

  return (frame) => {
    if (!cache[frame]) {
      console.log("cache miss");
      cache[frame] = getFrameFromDatabase(frame);
    }

    return cache[frame];
  };
};

const getFrameFromDatabase = (frame) => {
  return Math.floor(Math.random() * frame * 10000);
};

const MediaPlayer = playVideo();
console.log(MediaPlayer(2));
console.log(MediaPlayer(4));
console.log(MediaPlayer(2));
