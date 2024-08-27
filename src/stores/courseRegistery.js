import { defineStore } from "pinia";

import {
  SIMPLE_META,
  SIMPLE_FEATURES,
  SIMPLE_LAPS,
} from "src/stores/raceCourseData/SIMPLE";

import { WL_META, WL_FEATURES, WL_LAPS } from "src/stores/raceCourseData/WL";

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
    meta: [SIMPLE_META, WL_META, WLR29ER_META, WLR49ER_META],
    features: [
      SIMPLE_FEATURES,
      WL_FEATURES,
      WLR29ER_FEATURES,
      WLR49ER_FEATURES,
    ],
    laps: [SIMPLE_LAPS, WL_LAPS, WLR29ER_LAPS, WLR49ER_LAPS],
  }),
});
