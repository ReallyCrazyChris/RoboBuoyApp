<template>
  <div class="row">
    <div class="col-9">
      <q-select
        label="course"
        color="primary"
        options-selected-class="text-deep-orange"
        :modelValue="raceCourseOptions.selectedCourse"
        :options="raceCourseOptions.meta"
        @update:model-value="raceCourseOptions.applySelectedOption"
      >
        <template v-slot:selected>
          {{ raceCourseOptions.selectedCourse.description }}
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.name }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
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
        :modelValue="raceCourseOptions.selectedLap"
        :options="raceCourseOptions.lapOptions"
        @update:model-value="raceCourseOptions.applySelectedLap"
      >
        <template v-slot:selected>
          {{ raceCourseOptions.selectedLap.label }}
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label caption>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
import { useRaceCourseOptions } from "src/stores/raceCourseOptions";

const raceCourseOptions = useRaceCourseOptions();

export default {
  name: "raceCourseOptions",
  setup(props) {
    return { raceCourseOptions };
  },
};
</script>
<style></style>
