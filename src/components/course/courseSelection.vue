<template>
  <div class="row q-pt-sm">
    <div class="col-9">
      <q-select
        :filled="!readonly"
        :readonly
        dense
        label="course type"
        color="primary"
        class="q-pr-sm"
        options-selected-class="text-deep-orange"
        :modelValue="courseSelection.selectedCourse"
        :options="courseSelection.meta"
        @update:model-value="courseSelection.applySelectedOption"
      >
        <template v-slot:selected>
          {{ courseSelection.selectedCourse.description }}
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
        :filled="!readonly"
        :readonly
        dense
        align="right"
        label="laps"
        color="primary"
        options-selected-class="text-deep-orange"
        :modelValue="courseSelection.selectedLap"
        :options="courseSelection.lapOptions"
        @update:model-value="courseSelection.applySelectedLap"
      >
        <template v-slot:selected>
          {{ courseSelection.selectedLap.label }}
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
import { useRaceCourseOptions } from "src/stores/courseSelection";

const courseSelection = useRaceCourseOptions();

export default {
  name: "courseSelection",
  props: ["readonly"],
  setup(props) {
    return { courseSelection };
  },
};
</script>
<style></style>
