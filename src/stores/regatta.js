import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

export const useRegatta = defineStore("regatta", {
  state: () => ({
    id: "",
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    lon: 0,
    lat: 0,
    viewmode: true,
  }),

  actions: {
    createRegattaId() {
      this.id = `${Math.random().toString(16).substring(2, 10)}`;
    },

    setCoordinates(lon, lat) {
      this.lon = lon;
      this.lat = lat;
    },

    saveTransition() {
      this.viewmode = true;

      if (mqttHook.isConnected) {
        mqttHook.publish(
          "regatta",
          JSON.stringify({
            id: this.id,
            title: this.title,
            description: this.description,
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            lon: this.lon,
            lat: this.lat,
          }),
          0,
          { retain: true }
        );
      }
    },

    editTransition() {
      this.viewmode = false;
    },
  },
});
