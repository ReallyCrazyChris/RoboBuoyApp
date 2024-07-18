import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

export const gpsStoreDefinition = defineStore("gps", {
  state: () => ({
    lon: 0,
    lat: 0,
    sog: 0,
    heading: 0,
    accuracy: 5,
    watchid: null,
    wathcoptions: {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0,
    },
  }),

  actions: {
    watchsuccess(pos) {
      this.lon = pos.coords.longitude;
      this.lat = pos.coords.latitude;
      this.sog = pos.coords.speed;
      this.heading = pos.coords.heading;
      this.accuracy = pos.coords.accuracy;

      /*
      if (mqttHook.isConnected) {
        mqttHook.publish(
          "gps",
          JSON.stringify({
            lon: this.lon,
            lat: this.lat,
            sog: this.sog,
            heading: this.heading,
            accuracy: this.accuracy,
          })
        );
      } */
    },

    watcherror(err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
    },

    watchPosition() {
      this.watchid = navigator.geolocation.watchPosition(
        this.watchsuccess,
        this.watcherror,
        this.wathcoptions
      );
    },

    clearWatchPosition() {
      navigator.geolocation.clearWatch(this.watchid);
    },
  },
});

// singleton
const useGPSStore = gpsStoreDefinition();

// singleton
export const useGps = () => {
  return useGPSStore;
};
