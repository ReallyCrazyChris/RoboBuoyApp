import { defineStore } from "pinia";

export const timerSequeceOptions = [
  {
    label: "2 minute",
    value: "2",
    description: "2m - 1m - 30s - Start ",
    image: "src/assets/sequcence/2minute.png",
    timeSequence: [
      { time: -2 * 60, event: "raceclass", airhorn: 1 },
      { time: -1 * 60, event: "prepare", airhorn: 1 },
      { time: -1 * 30, event: "ready", airhorn: 1 },
      { time: 0, event: "start", airhorn: 1 },
      { time: 3, event: "racetimer", airhorn: 0 },
    ],
  },
  {
    label: "5 minute",
    value: "5",
    description: "5m - 4m - 1m - Start ",
    image: "src/assets/sequcence/5minute.png",
    timeSequence: [
      { time: -5 * 60, event: "raceclass", airhorn: 1 },
      { time: -4 * 60, event: "prepare", airhorn: 1 },
      { time: -1 * 60, event: "ready", airhorn: 1 },
      { time: 0, event: "start", airhorn: 1 },
      { time: 3, event: "racetimer", airhorn: 0 },
    ],
  },
  {
    label: "10 minute",
    value: "10",
    description: "10m - 9m - 1m - Start ",
    image: "src/assets/sequcence/10minute.png",
    timeSequence: [
      { time: -10 * 60, event: "raceclass", airhorn: 1 },
      { time: -9 * 60, event: "prepare", airhorn: 1 },
      { time: -1 * 60, event: "ready", airhorn: 1 },
      { time: 0, event: "start", airhorn: 1 },
      { time: 3, event: "racetimer", airhorn: 0 },
    ],
  },
];

export const prepareFlagOptions = [
  {
    label: "Papa",
    value: "P",
    description: "Prepare",
    image: "src/assets/racesignals/papa.png",
  },
  {
    label: "Italy",
    value: "I",
    description: "Rule 30.1",
    image: "src/assets/racesignals/italy.png",
  },
  {
    label: "Zulu",
    value: "Z",
    description: "Rule 30.2",
    image: "src/assets/racesignals/zulu.png",
  },
  {
    label: "Uniform",
    value: "U",
    description: "Rule 30.3",
    image: "src/assets/racesignals/uniform.png",
  },
  {
    label: "Black",
    value: "B",
    description: "Rule 30.4",
    image: "src/assets/racesignals/black.png",
  },
];

export const classFlagOptions = [
  {
    label: "Optimist",
    value: "optimist",
    description: "",
    image: "src/assets/boatclasses/optimist.png",
  },
  {
    label: "29er",
    value: "29er",
    description: "",
    image: "src/assets/boatclasses/29er.png",
  },
  {
    label: "ILCA",
    value: "ilca",
    description: "",
    image: "src/assets/boatclasses/ilca.png",
  },
];

export const yankeeFlagOptions = [
  {
    label: "Yankee",
    value: true,
    description: "Wear personal flotation device",
    image: "src/assets/racesignals/yankee.png",
  },
  {
    label: "No Yankee",
    value: false,
    description: "personal flotation devices optional",
    image: "",
  },
];

export const timerSequenceModel = {
  label: "5 minute",
  value: "5",
  description: "5m - 4m - 1m - Start ",
  image: "src/assets/sequcence/5minute.png",
  timeSequence: [
    {
      time: -5 * 60,
      event: "raceclass",
      airhorn: 1,
    },
    {
      time: -4 * 60,
      event: "prepare",
      airhorn: 1,
    },
    {
      time: -1 * 60,
      event: "ready",
      airhorn: 1,
    },
    {
      time: 0,
      event: "start",
      airhorn: 1,
    },
    {
      time: 3,
      event: "racetimer",
      airhorn: 0,
    },
  ],
};

export const classFlagModel = {
  label: "Optimist",
  value: "optimist",
  description: "",
  image: "src/assets/boatclasses/optimist.png",
};

export const prepareFlagModel = {
  label: "Papa",
  value: "P",
  description: "Prepare",
  image: "src/assets/racesignals/papa.png",
};

export const yankeeFlagModel = {
  label: "Yankee",
  value: true,
  description: "Wear personal flotation device",
  image: "src/assets/racesignals/yankee.png",
};

const raceTimerDefinition = defineStore("raceTimer", {
  state: () => ({
    startTime: undefined, //epochtime
    endTime: undefined, //epochtime
    raceTime: undefined,
    raceState: "raceinfo",
    timerSequenceModel,
    classFlagModel,
    prepareFlagModel,
    yankeeFlagModel,
    timerSequeceOptions,
    classFlagOptions,
    prepareFlagOptions,
    yankeeFlagOptions,
    intervalId: undefined,
  }),

  persist: false,

  actions: {
    matches(statename) {
      if (this.raceState == statename) {
        return true;
      }
      return false;
    },

    raceinfoTransition() {
      this.raceState = "raceinfo";
      this.airhorn(1);
    },

    startraceTransition() {
      this.raceState = "raceclass";
      this.startSequenceTimer();
      this.airhorn(1);
    },

    postponeraceTransition() {
      this.stopSequenceTimer();
      this.raceState = "racepostponed";
      this.airhorn(2);
    },

    postponeashoreTransition() {
      this.stopSequenceTimer();
      this.raceState = "racepostponed_ashore";
      this.airhorn(2);
    },

    postponetodayTransition() {
      this.stopSequenceTimer();
      this.raceState = "racepostponed_today";
      this.airhorn(2);
    },

    recalloneTransition() {
      this.raceState = "recallone";
      this.airhorn(1);
    },

    racecontinueTransition() {
      this.raceState = "racetimer";
    },

    recallallTransition() {
      this.stopSequenceTimer();
      this.raceState = "recallall";
      this.airhorn(2);
    },

    racecompletedTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceinfo";
    },

    abandonTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceabandoned";
      this.airhorn(3);
    },

    abandonashoreTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceabandoned_ashore";
      this.airhorn(3);
    },

    abandontodayTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceabandoned_today";
      this.airhorn(3);
    },

    startSequenceTimer() {
      // clear the racetime
      clearInterval(this.intervalId);
      this.raceTime = undefined;
      this.endTime = undefined;

      // clone the start timing sequence
      var timeSequence = Object.assign(
        [],
        this.timerSequenceModel.timeSequence
      );

      // set the startTime in the
      this.startTime = Date.now() - (timeSequence.shift().time * 1000 + 3);

      this.intervalId = setInterval(() => {
        this.raceTime = Math.round((Date.now() - this.startTime) / 1000);

        // send sequence events to the stateMachine
        if (timeSequence[0] && timeSequence[0].time <= this.raceTime) {
          this.raceState = timeSequence[0].event;
          if (timeSequence[0].airhorn > 0) {
            this.airhorn(timeSequence[0].airhorn);
          }
          timeSequence.shift();
        }
      }, 1000);
    },

    stopSequenceTimer() {
      this.raceTime = undefined;
      this.endTime = Date.now();
      clearInterval(this.intervalId);
    },

    airhorn(playCount = 1) {
      const audioContext = new AudioContext();
      audioContext.resume();

      let playCountArray = [];

      for (let i = 0; i < playCount; i++) {
        let soundInstance = new Audio("/src/assets/sounds/airhorn.mp3");
        playCountArray.push(soundInstance);

        if (playCountArray.length < playCount) {
          playCountArray[i].addEventListener("ended", () => {
            playCountArray.shift();
            playCountArray[0].play();
          });
        }
      }

      playCountArray[0].play();
    },
  },

  persist: {
    paths: [
      "startTime",
      "raceState",
      "timerSequenceModel",
      "classFlagModel",
      "prepareFlagModel",
      "yankeeFlagModel",
    ],
  },
});

const raceTimer = raceTimerDefinition();

export const useRaceTimer = () => {
  return raceTimer;
};
