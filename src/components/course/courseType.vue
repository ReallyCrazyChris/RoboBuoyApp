<template>
  <div class="row">
    <div class="col-9 q-mb-sm">
      <q-select
        :filled="!readonly"
        :readonly="readonly"
        dense
        label="course"
        color="primary"
        class="q-pr-sm"
        options-selected-class="text-deep-orange"
        :modelValue="course.courseType"
        :options="course.courseTypes"
        @update:model-value="course.selectCourseType"
      >
        <template v-slot:selected>
          {{ course.courseType.description }}
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
        :readonly="readonly"
        dense
        align="right"
        label="laps"
        color="primary"
        options-selected-class="text-deep-orange"
        :modelValue="course.lap"
        :options="course.lapTypes"
        @update:model-value="course.selectLapType"
      >
        <template v-slot:selected>
          {{ course.lap.label }}
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

    <div class="col-12">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="course.lap.description"
        label="route"
      />
    </div>
  </div>
</template>

<script>
import { useRaceCourse } from "src/stores/raceCourse";
const course = useRaceCourse();

export default {
  name: "courseType",
  props: {
    readonly: Boolean,
  },
  setup() {
    return { course };
  },
};
</script>
