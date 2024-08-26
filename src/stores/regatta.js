import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

export const useRegatta = defineStore("regatta", {
  state: () => ({
    id: "",
    name: "Quick Regatta",
    description: "Come join us for a quick regatta",
    dateTime: "",
    earliestStartTime: "",
    latestStartTime: "",
    location: "Segelhafen am Brombachsee, Germany",
    lon: null,
    lat: null,
  }),

  getters: {
    localDate(state) {
      return state.dateTime.slice(0, 10);
    },
    localTime(state) {
      return state.dateTime.slice(11, 16);
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
            dateTime: this.dateTime,
            earliestStartTime: this.earliestStartTime,
            latestStartTime: this.latestStartTime,
            location: this.location,
            lon: this.lon,
            lat: this.lat,
          }),
          0,
          { retain: true }
        );
      }
    },

    presetDateTime() {
      // Round the earliestStartTimeUTC to the begining of the next hour
      const earliestStartTimeUTC = new Date();
      earliestStartTimeUTC.setMinutes(0);
      earliestStartTimeUTC.setHours(earliestStartTimeUTC.getHours() + 1);

      // Round the latestStartTimeUTC to the end of the next hour
      const latestStartTimeUTC = new Date();
      latestStartTimeUTC.setMinutes(0);
      latestStartTimeUTC.setHours(latestStartTimeUTC.getHours() + 2);

      // cretae a dateTime format used by the datetime input type
      this.dateTime = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      // cretae a time format used by the time input type
      this.earliestStartTime = earliestStartTimeUTC
        .toLocaleTimeString()
        .substring(0, 5);

      // cretae a time format used by the time input type
      this.latestStartTime = latestStartTimeUTC
        .toLocaleTimeString()
        .substring(0, 5);
    },

    reset() {
      this.name = "Quick Regatta";
      this.description = "Come join us for a quick regatta";
      this.presetDateTime();
    },
  },
});
