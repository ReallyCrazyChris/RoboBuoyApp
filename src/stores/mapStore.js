import { defineStore } from "pinia";
export const useMapStore = defineStore("mapStore", {
  state: () => ({
    center: { lat: 49, lon: 10 },
    zoom: 9,
    bounds: null,
  }),
  getters: {
    lonlat: (state) => [Number(state.center[1]), Number(state.center[0])],
  },
});
