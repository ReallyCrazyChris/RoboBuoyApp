import { defineStore } from "pinia";

import { WLR29ER } from "./raceCourseData/WLR29ER";
import { WLR49ER } from "./raceCourseData/WLR49ER";

import { useRaceCourse } from "src/stores/raceCourse";

const course = useRaceCourse();

export const useRaceCourseOptions = defineStore("raceCourseOptions", {
  state: () => ({
    selected: 0,
    options: [WLR29ER, WLR49ER],
  }),

  getters: {
    selectedOption(state) {
      return state.options[state.selected];
    },
  },
  actions: {
    applySelectedOption(selectedOption) {
      console.log(selectedOption);
      course.$patch(selectedOption);
      this.selected = this.options.indexOf(selectedOption);

      console.log(course);
    },
  },

  persist: false,
});
