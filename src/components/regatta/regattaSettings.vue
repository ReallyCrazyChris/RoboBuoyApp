<template>
  <div class="fit row wrap justify-start items-center content-center q-pt-sm">
    <div class="col-12">
      <q-input
        :filled="!readonly"
        :readonly
        dense
        v-model="regatta.title"
        class="q-pb-sm"
        label="name"
      ></q-input>
    </div>

    <div class="col-12">
      <q-input
        :filled="!readonly"
        :readonly
        dense
        v-model="regatta.description"
        class="q-pb-sm"
        label="description"
      />
    </div>

    <div class="col-12">
      <q-input
        :filled="!readonly"
        :readonly
        dense
        v-model="regatta.date"
        class="q-pb-sm"
        label="date and time"
        type="datetime-local"
      />
    </div>

    <div class="col-6">
      <q-input
        :filled="!readonly"
        :readonly
        dense
        v-model="regatta.startTime"
        class="q-pb-sm q-pr-xs"
        type="time"
        label="earliest race start "
      />
    </div>

    <div class="col-6">
      <q-input
        :filled="!readonly"
        :readonly
        dense
        v-model="regatta.endTime"
        class="q-pb-sm q-pl-xs"
        type="time"
        label="latest race start"
      />
    </div>
  </div>
</template>

<script>
import { useRegatta } from "src/stores/regatta";

const regatta = useRegatta();

export default {
  name: "regattaOptions",
  props: ["readonly"],
  setup() {
    return {
      regatta,
    };
  },
};
</script>
