import { defineStore } from "pinia";

export const useMarkCollection = defineStore("markCollection", {
  state: () => ({
    markcollection: {
      0: {
        id: 0,
        label: "Mark 1",
        lon: 0,
        lat: 0,
        color: "priamry",
      },
      1: {
        id: 1,
        label: "Mark 2",
        lon: 0,
        lat: 0,
        color: "positive",
      },
      2: {
        id: 2,
        label: "Mark 3",
        lon: 0,
        lat: 0,
        color: "warning",
      },
    },
  }),

  actions: {
    getLonFor(id) {
      return this.markcollection[id].lon;
    },
    getLatFor(id) {
      return this.markcollection[id].lat;
    },
    count() {
      return Object.keys(this.markcollection).length;
    },
    setCoordinates(id, lon, lat) {
      this.markcollection[id].lon = lon;
      this.markcollection[id].lat = lat;
    },
  },
});
