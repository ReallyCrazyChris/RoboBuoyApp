import { defineStore } from "pinia";
export const useMapStore = defineStore("omapStore", {
  state: () => ({
    center: ["49.6944390", "10.8274420"],
    rotation: 0,
    zoom: 1,
    projection: "EPSG:3857",
  }),
});
