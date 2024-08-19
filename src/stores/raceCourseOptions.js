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
    meta: [WLR29ER_META, WLR49ER_META],
    features: [WLR29ER_FEATURES, WLR49ER_FEATURES],
    laps: [WLR29ER_LAPS, WLR49ER_LAPS],
  }),

  getters: {
    selectedCourse(state) {
      return state.meta[course.selectedCourseItem];
    },

    lapOptions(state) {
      return state.laps[course.selectedCourseItem];
    },

    selectedLap(state) {
      return state.laps[course.selectedCourseItem][course.selectedLapItem];
    },
  },
  actions: {
    applySelectedOption(metaItem) {
      course.selectedCourseItem = this.meta.indexOf(metaItem);
      //this.selectedLapItem = 0;
      course.$patch({
        features: this.features[course.selectedCourseItem],
        signature: Date.now(),
      });

      course.publishRaceCourseState();
    },

    applySelectedLap(lapItem) {
      course.selectedLapItem =
        this.laps[course.selectedCourseItem].indexOf(lapItem);
      course.$patch({
        lap: this.laps[course.selectedCourseItem][course.selectedLapItem],
        signature: Date.now(),
      });
      course.publishRaceCourseState();
    },
  },

  persist: false,
});
