import { defineStore } from "pinia";

import {
  SIMPLE_META,
  SIMPLE_FEATURES,
  SIMPLE_LAPS,
} from "src/stores/raceCourseData/SIMPLE";

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

export const useCourseRegistary = defineStore("courseRegistary", {
  state: () => ({
    meta: [SIMPLE_META, WLR29ER_META, WLR49ER_META],
    features: [SIMPLE_FEATURES, WLR29ER_FEATURES, WLR49ER_FEATURES],
    laps: [SIMPLE_LAPS, WLR29ER_LAPS, WLR49ER_LAPS],
  }),
});
