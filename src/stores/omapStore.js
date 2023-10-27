import { defineStore } from "pinia";
export const useOMapStore = defineStore("omapStore", {
  state: () => ({
    center: [0, 0],
    rotation: 0,
    zoom: 1,
    projection: "EPSG:3857",
  }),
});
