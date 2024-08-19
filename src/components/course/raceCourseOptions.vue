<template>
  <div class="row">
    <div class="col-12">
      <q-select
        label="course"
        color="primary"
        options-selected-class="text-deep-orange"
        :modelValue="raceCourseOptions.selectedOption"
        :options="raceCourseOptions.meta"
        @update:model-value="raceCourseOptions.applySelectedOption"
      >
        <template v-slot:selected>
          {{ raceCourseOptions.selectedOption.name }}
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

    <!--div class="col-3">
      <q-select
        label="laps"
        color="primary"
        options-selected-class="text-deep-orange"
        :modelValue="course.selectedSequence"
        :options="course.sequence.options"
        @update:model-value="setSequenceOption"
      >
        <template v-slot:selected>
          {{ course.selectedSequence.lapCount }}
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label caption>{{ scope.opt.lapCount }} laps</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div-->
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
  methods: {},
};
</script>
<style></style>
