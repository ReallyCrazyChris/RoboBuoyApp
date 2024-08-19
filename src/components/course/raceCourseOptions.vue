<template>
  <div class="row">
    <!--div class="col-9">
      <q-select
        class="col-9 q-pr-sm"
        label="course"
        color="primary"
        options-selected-class="text-deep-orange"
        :modelValue="courseOptions.selectedOption"
        :options="courseOptions.options"
        @update:model-value="courseOptions.applySelectedOption"
      >
        <template v-slot:selected>
          {{ courseOptions.selectedOption.title.label }}
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
export default {
  name: "courseOptions",
  setup(props) {
    return {};
  },
  methods: {},
};
</script>
<style></style>
