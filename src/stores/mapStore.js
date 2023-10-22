import { defineStore } from "pinia";

export const useMapStore = defineStore("mapStore", {
  state: () => ({
    center: ["0", "0"],
    zoom: 9,
    bounds: null,
  }),
});
