import { defineStore } from "pinia";
import { createEmpty, extend, boundingExtent, getCenter } from "ol/extent";
import { fromLonLat, toLonLat } from "ol/proj";

const extentOfInterest = createEmpty();

export const useMapStore = defineStore("mapStore", {
  state: () => ({
    projection: "EPSG:3857",
    rotation: 0,
    zoom: 1,
    center: [0, 0], // Type: Projection Position, [Lon, Lat]
  }),
  getters: {
    lonlat: (state) => toLonLat(state.center),
  },
  actions: {
    zoomToCoordinate(coordinate) {
      this.center = coordinate;
      this.zoom = 18;
    },
  },
});
