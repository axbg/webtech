const songs = [
  { name: 'Channel Tres - 6am', duration: 180 },
  { name: 'Jungle - Back on 74', duration: 200 },
  { name: 'Kali Uchis - Moonlight', duration: 187 },
  { name: 'Biig Piig - Sunny', duration: 167 }
];

const totalDurationInSeconds = songs.reduce((acc, el) => acc + el.duration, 0);

console.log(totalDurationInSeconds);
// expected: 734

console.log(Math.floor(totalDurationInSeconds / 60) + " minute si " + totalDurationInSeconds % 60 + " secunde");
