import { defineStore } from "pinia";
import { createEmpty, extend, boundingExtent, getCenter } from "ol/extent";
import { fromLonLat, toLonLat } from "ol/proj";

const extentOfInterest = createEmpty();

export const useMapStore = defineStore("mapStore", {
  state: () => ({
    projection: "EPSG:3857",
    center: [0, 0], // Type: Projection Position, [Lon, Lat]
    rotation: 0,
    zoom: 1,
  }),
  getters: {
    lonlat: (state) => toLonLat(state.center),
  },
  actions: {
    zoomToCoordinate(coordinate) {
      this.center = fromLonLat([10.832274248052466, 49.70878107952494]);
      //this.center = coordinate;
      this.zoom = 19;
    },
  },
});
