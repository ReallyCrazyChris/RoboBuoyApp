import { defineStore } from "pinia";

export const useVmcStore = defineStore("vmcStore", {
  state: () => ({
    vmc: 1,
    sog: 2,
    risk: 55,
  }),
});
