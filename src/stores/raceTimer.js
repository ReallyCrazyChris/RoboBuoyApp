import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

import { useSounds } from "stores/sounds";
const sounds = useSounds();

export const timerSequeceOptions = [
  {
    label: "2 minute",
    value: "2",
    description: "2m - 1m - 30s - Start ",
    timeSequence: {
      raceclass: -120,
      raceprepare: -60,
      raceready: -30,
      racestart: 0,
      racetimer: 10,
    },
  },
  {
    label: "5 minute",
    value: "5",
    description: "5m - 4m - 1m - Start ",
    timeSequence: {
      raceclass: -60 * 5,
      raceprepare: -60 * 4,
      raceready: -60,
      racestart: 0,
      racetimer: 10,
    },
  },
  {
    label: "10 minute",
    value: "10",
    description: "10m - 9m - 1m - Start ",
    timeSequence: {
      raceclass: -60 * 10,
      raceprepare: -60 * 9,
      raceready: -60,
      racestart: 0,
      racetimer: 10,
    },
  },
];

export const prepareFlagOptions = [
  {
    label: "Papa",
    value: "P",
    description: "Prepare",
    image: "racesignals/papa.svg",
  },
  {
    label: "Italy",
    value: "I",
    description: "Rule 30.1",
    image: "racesignals/italy.svg",
  },
  {
    label: "Zulu",
    value: "Z",
    description: "Rule 30.2",
    image: "racesignals/zulu.svg",
  },
  {
    label: "Uniform",
    value: "U",
    description: "Rule 30.3",
    image: "racesignals/uniform.svg",
  },
  {
    label: "Black",
    value: "B",
    description: "Rule 30.4",
    image: "racesignals/black.svg",
  },
];

export const classFlagOptions = [
  {
    label: "Optimist",
    value: "optimist",
    description: "",
    image: "boatclasses/optimist.png",
  },
  {
    label: "29er",
    value: "29er",
    description: "",
    image: "boatclasses/29er.png",
  },
  {
    label: "ILCA",
    value: "ilca",
    description: "",
    image: "boatclasses/ilca.png",
  },
];

export const yankeeFlagOptions = [
  {
    label: "Yankee",
    value: true,
    description: "Wear personal flotation device",
    image: "racesignals/yankee.svg",
  },
  {
    label: "No Yankee",
    value: false,
    description: "personal flotation devices optional",
    image: "",
  },
];

export const timerSequenceModel = {
  label: "2 minute",
  value: "2",
  description: "2m - 1m - 30s - Start ",
  timeSequence: {
    raceclass: -120,
    raceprepare: -60,
    raceready: -30,
    racestart: 0,
    racetimer: 10,
  },
};

export const classFlagModel = {
  label: "Optimist",
  value: "optimist",
  description: "",
  image: "boatclasses/optimist.png",
};

export const prepareFlagModel = {
  label: "Papa",
  value: "P",
  description: "Prepare",
  image: "racesignals/papa.svg",
};

export const yankeeFlagModel = {
  label: "Yankee",
  value: true,
  description: "Wear personal flotation device",
  image: "racesignals/yankee.svg",
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
  actions: {
    matches(statename) {
      if (this.raceState == statename) {
        return true;
      }
      return false;
    },

    publishRaceTimerState() {
      if (mqttHook.isConnected) {
        mqttHook.publish(
          "timer",
          JSON.stringify({
            startTime: this.startTime,
            raceState: this.raceState,
            timerSequenceModel: this.timerSequenceModel,
            classFlagModel: this.classFlagModel,
            prepareFlagModel: this.prepareFlagModel,
            yankeeFlagModel: this.yankeeFlagModel,
          }),
          0,
          { retain: true }
        );
      }
    },

    raceinfoTransition() {
      this.stopSequenceTimer();
      this.startTime = undefined;
      this.endTime = undefined;
      this.raceState = "raceinfo";
      this.publishRaceTimerState();
      sounds.airhorn(1);
    },

    raceclassTransition() {
      this.startTime =
        Date.now() - this.timerSequenceModel.timeSequence.raceclass * 1000;
      this.raceTime = 0;
      this.endTime = undefined;
      this.raceState = "raceclass";
      this.publishRaceTimerState();
      sounds.airhorn(1);
      this.startSequenceTimer();
    },

    raceprepareTransition() {
      this.raceState = "raceprepare";
      this.publishRaceTimerState();
      sounds.airhorn(1);
    },

    racereadyTransition() {
      this.raceState = "raceready";
      this.publishRaceTimerState();
      sounds.airhorn(1);
    },

    racestartTransition() {
      this.raceState = "racestart";
      this.publishRaceTimerState();
      sounds.airhorn(1);
    },

    racetimerTransition() {
      this.raceState = "racetimer";
      this.publishRaceTimerState();
    },

    startSequenceTimer() {
      // clear the racetime
      clearInterval(this.intervalId);

      this.intervalId = setInterval(() => {
        this.raceTime = Math.round((Date.now() - this.startTime) / 1000);

        if (
          this.raceState == "raceclass" &&
          this.raceTime >= this.timerSequenceModel.timeSequence.raceprepare
        ) {
          this.raceprepareTransition();
        }

        if (
          this.raceState == "raceprepare" &&
          this.raceTime >= this.timerSequenceModel.timeSequence.raceready
        ) {
          this.racereadyTransition();
        }

        if (
          this.raceState == "raceready" &&
          this.raceTime >= this.timerSequenceModel.timeSequence.racestart
        ) {
          this.racestartTransition();
        }

        if (
          this.raceState == "racestart" &&
          this.raceTime >= this.timerSequenceModel.timeSequence.racetimer
        ) {
          this.racetimerTransition();
        }
      }, 1000);
    },

    stopSequenceTimer() {
      this.startTime = undefined;
      this.raceTime = undefined;
      this.endTime = Date.now();
      clearInterval(this.intervalId);
    },

    postponeraceTransition() {
      this.stopSequenceTimer();
      this.raceState = "racepostponed";
      this.publishRaceTimerState();
      sounds.airhorn(2);
    },

    postponeashoreTransition() {
      this.stopSequenceTimer();
      this.raceState = "racepostponed_ashore";
      this.publishRaceTimerState();
      sounds.airhorn(2);
    },

    postponetodayTransition() {
      this.stopSequenceTimer();
      this.raceState = "racepostponed_today";
      this.publishRaceTimerState();
      sounds.airhorn(2);
    },

    recalloneTransition() {
      this.raceState = "recallone";
      this.publishRaceTimerState();
      sounds.airhorn(1);
    },

    racecontinueTransition() {
      this.raceState = "racetimer";
      this.publishRaceTimerState();
    },

    recallallTransition() {
      this.stopSequenceTimer();
      this.raceState = "recallall";
      this.publishRaceTimerState();
      sounds.airhorn(2);
    },

    racecompletedTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceinfo";
      this.publishRaceTimerState();
    },

    abandonTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceabandoned";
      this.publishRaceTimerState();
      sounds.airhorn(3);
    },

    abandonashoreTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceabandoned_ashore";
      this.publishRaceTimerState();
      sounds.airhorn(3);
    },

    abandontodayTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceabandoned_today";
      this.publishRaceTimerState();
      sounds.airhorn(3);
    },
  },

  _persist: {
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

mqttHook.registerEvent("timer", (topic, message) => {
  const patch = JSON.parse(message.toString());
  console.log("patch", patch);
  raceTimer.$patch(patch);

  if (
    [
      "raceclass",
      "raceprepare",
      "raceready",
      "racestart",
      "racetimer",
      "recallone",
    ].includes(raceTimer.raceState)
  ) {
    raceTimer.startSequenceTimer();
  }
});

// recover from an accidental page relaod

if (
  [
    "raceclass",
    "raceprepare",
    "raceready",
    "racestart",
    "racetimer",
    "recallone",
  ].includes(raceTimer.raceState)
) {
  raceTimer.startSequenceTimer();
}

export const useRaceTimer = () => {
  return raceTimer;
};
