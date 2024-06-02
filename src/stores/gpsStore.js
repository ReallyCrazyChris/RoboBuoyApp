import { defineStore } from "pinia";

export const useGpsStore = defineStore("gpsStore", {
  state: () => ({
    lon: 49.69627211119363,
    lat: 11,
    speed: 10,
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
      console.log(pos);
      this.lon = pos.coords.longitude;
      this.lat = pos.coords.latitude;
      this.speed = pos.coords.speed;
      this.heading = pos.coords.heading;
      this.accuracy = pos.coords.accuracy;
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
