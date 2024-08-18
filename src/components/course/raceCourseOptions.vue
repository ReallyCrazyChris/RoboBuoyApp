<template>
  <div class="row">
    <div class="col-9">
      <q-select
        class="col-9 q-pr-sm"
        label="course"
        name="yo"
        color="primary"
        options-selected-class="text-deep-orange"
        v-model="raceCourse"
        :options="raceCourseOptions"
        @update:model-value="updateRaceCourseState"
      >
        <template v-slot:selected>
          {{ raceCourse.title.description }}
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.title.label }}</q-item-label>
              <q-item-label caption>{{
                scope.opt.title.description
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div class="col-3">
      <q-select
        label="laps"
        color="primary"
        options-selected-class="text-deep-orange"
        v-model="raceCourse.sequence.selected"
        :options="raceCourse.sequence.options"
        @update:model-value="updateRaceCourseSequence"
      >
        <template v-slot:selected>
          {{ raceCourse.sequence.selected.lapCount }}
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label caption>{{ scope.opt.lapCount }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
//    @update:model-value="raceCourse.publishCourseState()"
import { useRaceCourse } from "src/stores/raceCourse";
import { WLR29ER } from "src/stores/raceCourseData/WLR29ER";
import { WLR49ER } from "src/stores/raceCourseData/WLR49ER";
import { WL } from "src/stores/raceCourseData/WL";

const raceCourse = useRaceCourse();

export default {
  name: "raceCourseOptions",
  setup(props) {
    return {
      raceCourse,
    };
  },
  methods: {
    updateRaceCourseState(raceCourseOption) {
      raceCourse.$patch(raceCourseOption);
      raceCourse.publishRaceCourseState();
    },

    updateRaceCourseSequence(sequence) {},
  },
  data() {
    return {
      raceCourseOptions: [WL, WLR29ER, WLR49ER],
    };
  },
};
</script>
<style></style>
