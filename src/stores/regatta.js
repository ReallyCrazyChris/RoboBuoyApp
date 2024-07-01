import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";

const mqttHook = useMQTT();

export const useRegatta = defineStore("regatta", {
  state: () => ({
    id: "1097",
    Title: "ZombieBieber",
    lon: null,
    lat: null,
    earliestStart: null,
    latestStart: null,
  }),

  actions: {},
});
