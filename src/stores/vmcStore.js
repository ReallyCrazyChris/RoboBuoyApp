import { defineStore } from "pinia";
import { Loading } from "quasar";

export const useVmcStore = defineStore("vmcStore", {
  state: () => ({
    vmc: 1,
    sog: 2,
    risk: 55,
    lon: 0,
    lat: 0,
    bearing: 0,
  }),
  actions: {
    update(lat, lon, heading, speed) {},
  },
});
