console.log("hi");

// start in 5000
const startTime = Date.now() + 6000;
const timeSequence = [
  { time: 5, event: "class" },
  { time: 4, event: "prepare" },
  { time: 1, event: "readytorace" },
  { time: 0, event: "start" },
  { time: 3, event: "racetime" },
];

const intervalID = setInterval(() => {
  const currentTime = Date.now();
  const time = Math.abs(Math.round((currentTime - startTime) / 1000));
  console.log("time", time);

  if (timeSequence[0] && timeSequence[0].time == time) {
    console.log(timeSequence[0].event);
    timeSequence.shift();
  }
}, 1000);
