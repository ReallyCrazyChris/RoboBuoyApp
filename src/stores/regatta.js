import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

export const useRegatta = defineStore("regatta", {
  state: () => ({
    id: "",
    name: "Quick Regatta",
    description: "Come join us for a quick regatta",
    date: "",
    earliestStartTime: "",
    latestStartTime: "",
  }),

  getters: {
    localDate(state) {
      return state.date.slice(0, 10);
    },
    localTime(state) {
      return state.date.slice(11, 16);
    },
  },

  actions: {
    createRegattaId() {
      this.id = `${Math.random().toString(16).substring(2, 10)}`;
    },

    publishRegattaState() {
      if (mqttHook.isConnected) {
        mqttHook.publish(
          "regatta",
          JSON.stringify({
            id: this.id,
            title: this.title,
            description: this.description,
            date: this.date,
            earliestStartTime: this.earliestStartTime,
            latestStartTime: this.latestStartTime,
          }),
          0,
          { retain: true }
        );
      }
    },

    presetDateTime() {
      const earliestStartTimeUTC = new Date();

      // round up to the next full hour
      earliestStartTimeUTC.setMinutes(earliestStartTimeUTC.getMinutes() + 31);
      earliestStartTimeUTC.setMinutes(0);

      const latestStartTimeUTC = new Date(earliestStartTimeUTC);
      // allow for 2 hours to start races
      latestStartTimeUTC.setHours(latestStartTimeUTC.getHours() + 2);

      this.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);

      this.earliestStartTime = earliestStartTimeUTC
        .toLocaleTimeString()
        .substring(0, 5);

      this.latestStartTime = latestStartTimeUTC
        .toLocaleTimeString()
        .substring(0, 5);
    },

    reset() {
      this.name = "";
      this.description = "";
      this.presetDateTime();
    },
  },
});
