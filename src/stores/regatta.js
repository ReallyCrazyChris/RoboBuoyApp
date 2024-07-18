import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

function getRegattaId() {
  "creates and return a unique client id for the device";
  let clientId = localStorage.getItem("Id");

  if (!clientId) {
    clientId = `${Math.random().toString(16).substring(2, 10)}`;
    localStorage.setItem("clientId", clientId);
  }

  return clientId;
}

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
  }),

  actions: {
    createRegattaId() {
      this.id = `${Math.random().toString(16).substring(2, 10)}`;
    },

    setCoordinates(lon, lat) {
      this.lon = lon;
      this.lat = lat;
    },
  },

  persist: true,
});
