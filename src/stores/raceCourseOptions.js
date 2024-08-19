import { defineStore } from "pinia";

import {
  WLR29ER_META,
  WLR29ER_FEATURES,
  WLR29ER_LAPS,
} from "src/stores/raceCourseData/WLR29ER";

import {
  WLR49ER_META,
  WLR49ER_FEATURES,
  WLR49ER_LAPS,
} from "src/stores/raceCourseData/WLR49ER";

import { useRaceCourse } from "src/stores/raceCourse";
const course = useRaceCourse();

export const useRaceCourseOptions = defineStore("raceCourseOptions", {
  state: () => ({
    selected: 0,
    meta: [WLR29ER_META, WLR49ER_META],
    features: [WLR29ER_FEATURES, WLR49ER_FEATURES],
    laps: [WLR29ER_LAPS, WLR49ER_LAPS],
  }),

  getters: {
    selectedOption(state) {
      return state.meta[state.selected];
    },
  },
  actions: {
    applySelectedOption(metaItem) {
      this.selected = this.meta.indexOf(metaItem);
      course.$patch({
        features: this.features[this.selected],
        signature: Date.now(),
      });
    },
  },

  persist: false,
});
