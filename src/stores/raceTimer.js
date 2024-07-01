import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";

const mqttHook = useMQTT();

export const useRace = defineStore("race", {
  state: () => ({
    id: 1234,
    race: 1,
    timerSequcence: 6,
    startTime: null,
    finishTime: null,
  }),

  persist: true,

  actions: {
    start() {
      if (mqttHook.isConnected) {
        mqttHook.publish(
          "race/" + this.id,
          JSON.stringify({
            id: this.id,
            sequcence: this.sequcence,
            startTime: this.startTime,
            finishTime: this.finishTime,
          })
        );
      }
    },
  },
});
