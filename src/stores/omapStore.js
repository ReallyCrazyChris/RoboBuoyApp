import { defineStore } from "pinia";
export const useMapStore = defineStore("omapStore", {
  state: () => ({
    center: [10.83228608468917, 49.70880062702443],
    rotation: 0,
    zoom: 1,
    projection: "EPSG:3857",
    extent: [
      -0.004850444624090677, 43.407437348423606, 12.00485044462409,
      54.592562651576394,
    ],
  }),
});
