import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

import { useSounds } from "stores/sounds";
const sounds = useSounds();

export const timerSequeceOptions = [
  {
    label: "1 minute",
    value: "1",
    description: "1m - 30s - 10s - Start ",
    timeSequence: {
      raceclass: -60,
      raceprepare: -30,
      raceready: -10,
      racestart: 0,
      racetimer: 10,
    },
  },
  {
    label: "3 minute",
    value: "3",
    description: "3m - 2m - 1m - Start ",
    timeSequence: {
      raceclass: -180,
      raceprepare: -120,
      raceready: -60,
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
  {
    label: "Melges 24",
    value: "m24",
    description: "",
    image: "boatclasses/m24.png",
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

    publishRaceTransition(action) {
      if (mqttHook.isConnected) {
        mqttHook.publish("racetransition", String(action));
      }
    },

    publishRaceTimerState() {
      if (mqttHook.isConnected) {
        mqttHook.publish(
          "racetimer",
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

    // handles remote transition actions from comitte boat
    racetransitionHandler(action) {
      if (action == "raceinfo") {
        this.raceinfoTransition();
      }

      if (action == "followme") {
        this.followmeTransition();
      }

      if (action == "raceclass") {
        this.raceclassTransition();
      }

      if (action == "racepostponed") {
        this.racepostponedTransition();
      }

      if (action == "racepostponedashore") {
        this.racepostponedashoreTransition();
      }

      if (action == "racepostponedtoday") {
        this.racepostponedtodayTransition();
      }

      if (action == "racecompleted") {
        this.racecompletedTransition();
      }

      if (action == "recallone") {
        this.recalloneTransition();
      }

      if (action == "racecontinue") {
        this.racecontinueTransition();
      }

      if (action == "recallall") {
        this.recallallTransition();
      }

      if (action == "raceabandoned") {
        this.raceabandonedTransition();
      }

      if (action == "raceabandonedashore") {
        this.raceabandonedashoreTransition();
      }

      if (action == "raceabandonedtoday") {
        this.raceabandonedtodayTransition();
      }
    },

    mqttUpdate(patch) {
      console.log(patch);
      // if the patch creates a state change
      if (this.raceState != patch.raceState) {
        this.$patch(patch);
        if (patch.raceState == "raceinfo") {
          this.raceinfoTransition();
        }

        if (patch.raceState == "raceclass") {
          this.raceclassTransition();
        }

        if (patch.raceState == "racepostponed") {
          this.racepostponedTransition();
        }

        if (patch.raceState == "racepostponedashore") {
          this.racepostponedashoreTransition();
        }

        if (patch.raceState == "racepostponedtoday") {
          this.racepostponedtodayTransition();
        }

        if (patch.raceState == "recallone") {
          this.recalloneTransition();
        }

        if (patch.raceState == "recallall") {
          this.recallallTransition();
        }

        /** duplicate "raceinfo" ... now what
        if (patch.raceState == "raceinfo") {
          this.racecompletedTransition();
        }
        */

        if (patch.raceState == "raceabandoned") {
          this.raceabandonedTransition();
        }

        if (patch.raceState == "raceabandonedashore") {
          this.raceabandonedashoreTransition();
        }

        if (patch.raceState == "raceabandonedtoday") {
          this.raceabandonedtodayTransition();
        }
      } else {
        this.$patch(patch);
      }
    },

    raceinfoTransition() {
      this.stopSequenceTimer();
      this.startTime = undefined;
      this.endTime = undefined;
      this.raceState = "raceinfo";
      this.publishRaceTimerState();
      //sounds.airhorn(1);
    },

    followmeTransition() {
      this.stopSequenceTimer();
      this.startTime = undefined;
      this.endTime = undefined;
      this.raceState = "followme";
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
      // the sequence timer is 'booted' in 'src/boot/sequencetimerBoot' and runs continously
      // clear the racetime
      clearInterval(this.intervalId);

      setTimeout(() => {
        this.intervalId = setInterval(() => {
          if (Number.isInteger(this.startTime)) {
            // a start time has been defined
            this.raceTime = Math.round((Date.now() - this.startTime) / 1000);
          }

          if (
            this.startTime != undefined &&
            this.raceState == "raceclass" &&
            this.raceTime >= this.timerSequenceModel.timeSequence.raceprepare
          ) {
            this.raceprepareTransition();
          }

          if (
            this.startTime != undefined &&
            this.raceState == "raceprepare" &&
            this.raceTime >= this.timerSequenceModel.timeSequence.raceready
          ) {
            this.racereadyTransition();
          }

          if (
            this.startTime != undefined &&
            this.raceState == "raceready" &&
            this.raceTime >= this.timerSequenceModel.timeSequence.racestart
          ) {
            this.racestartTransition();
          }

          if (
            this.startTime != undefined &&
            this.raceState == "racestart" &&
            this.raceTime >= this.timerSequenceModel.timeSequence.racetimer
          ) {
            this.racetimerTransition();
          }
        }, 1000);

        // syncornize all timers to the closest round second to reduce the time difference between race participants
      }, 1000 - new Date().getMilliseconds());
    },

    stopSequenceTimer() {
      this.startTime = undefined;
      this.endTime = Date.now();
    },

    racepostponedTransition() {
      this.stopSequenceTimer();
      this.raceState = "racepostponed";
      this.publishRaceTimerState();
      sounds.airhorn(2);
    },

    racepostponedashoreTransition() {
      this.stopSequenceTimer();
      this.raceState = "racepostponedashore";
      this.publishRaceTimerState();
      sounds.airhorn(2);
    },

    racepostponedtodayTransition() {
      this.stopSequenceTimer();
      this.raceState = "racepostponedtoday";
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

    raceabandonedTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceabandoned";
      this.publishRaceTimerState();
      sounds.airhorn(3);
    },

    raceabandonedashoreTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceabandonedashore";
      this.publishRaceTimerState();
      sounds.airhorn(3);
    },

    raceabandonedtodayTransition() {
      this.stopSequenceTimer();
      this.raceState = "raceabandonedtoday";
      this.publishRaceTimerState();
      sounds.airhorn(3);
    },
  },
});

const raceTimer = raceTimerDefinition();

export const useRaceTimer = () => {
  return raceTimer;
};
