import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";

const mqttHook = useMQTT();

export const useGps = defineStore("gps", {
  state: () => ({
    lon: 49.69627211119363,
    lat: 11,
    sog: 10,
    heading: 180,
    accuracy: 5,

    watchoptions: {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0,
    },

    watchid: null,
  }),

  actions: {
    watchsuccess(pos) {
      this.lon = pos.coords.longitude;
      this.lat = pos.coords.latitude;
      this.sog = Math.round(pos.coords.speed * 19.4384) / 10;
      this.heading = pos.coords.heading;
      this.accuracy = pos.coords.accuracy;

      if (mqttHook.isConnected) {
        mqttHook.publish(
          "gps/1234",
          JSON.stringify({
            lon: this.lon,
            lat: this.lat,
            sog: this.sog,
            heading: this.heading,
          })
        );
      }
    },

    watcherror(err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
    },

    watchPosition() {
      this.watchid = navigator.geolocation.watchPosition(
        this.watchsuccess,
        this.watcherror,
        this.watchoptions
      );
    },

    clearWatchPosition() {
      navigator.geolocation.clearWatch(this.watchid);
    },
  },
});
