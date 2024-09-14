import { defineStore } from "pinia";
import { useRaceParticipants } from "src/stores/raceParticipants";

export const useRegattaResults = defineStore("regattaresults", {
  state: () => ({
    items: [],
  }),
  getters: {},
  actions: {
    add(raceparticipants) {
      // replace or add particiant to items
      this.items.push(JSON.parse(JSON.stringify(raceparticipants.$state)));
    },
  },
});
