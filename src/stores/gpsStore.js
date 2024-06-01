import { defineStore } from "pinia";

export const useGpsStore = defineStore("gpsStore", {
  state: () => ({
    lon: 49.70878107952494,
    lat: 10.832274248052466,
    speed: 2.7,
    heading: 20,
    accuracy: 0,

    positionOptions: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    },

    watchoptions: {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    },

    watchid: null,
  }),

  actions: {
    positionSuccess(pos) {
      const crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`Heading: ${crd.heading}`);
      console.log(`Speed: ${crd.speed}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    },

    positionError(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },

    getPosition() {
      navigator.geolocation.getCurrentPosition(
        this.positionSuccess,
        this.positionError,
        this.positionOptions
      );
    },

    watchsuccess(pos) {
      const crd = pos.coords;

      console.log("Your updated position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`Heading: ${crd.heading}`);
      console.log(`Speed: ${crd.speed}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      this.lon = crd.longitude;
      this.lat = crd.latitude;
      this.speed = crd.speed;
      this.heading = crd.heading;
      this.accuracy = crd.accuracy;
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
