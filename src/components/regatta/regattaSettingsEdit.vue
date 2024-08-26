<template>
  <div class="fit row wrap justify-start items-center content-center q-pt-sm">
    <div class="col-10">
      <q-input
        filled
        dense
        v-model="regatta.name"
        class="q-pb-sm"
        label="name"
      ></q-input>
    </div>

    <div class="col-2 self-start text-right">
      <q-btn round icon="delete" color="primary" @click="regatta.reset()" />
    </div>

    <div class="col-12">
      <q-input
        filled
        dense
        v-model="regatta.description"
        class="q-pb-sm"
        label="description"
      />
    </div>

    <div class="col-10 q-pb-sm q-pr-sm">
      <q-input
        filled
        dense
        v-model="regatta.dateTime"
        label="date and time"
        type="datetime-local"
      />
    </div>

    <div class="col-2 self-start text-right">
      <q-btn
        round
        icon="today"
        color="primary"
        @click="regatta.presetDateTime()"
        ><q-tooltip class="bg-primary">current date & time</q-tooltip></q-btn
      >
    </div>

    <div class="col-6">
      <q-input
        filled
        dense
        v-model="regatta.earliestStartTime"
        class="q-pb-sm q-pr-xs"
        type="time"
        label="earliest race start "
      />
    </div>

    <div class="col-6">
      <q-input
        filled
        dense
        v-model="regatta.latestStartTime"
        class="q-pb-sm q-pl-xs"
        type="time"
        label="latest race start"
      />
    </div>

    <div class="col-10 self-center q-pb-sm">
      <q-input filled dense v-model="regatta.location" label="location" />
    </div>
    <div class="col-2 text-right self-center q-pb-sm">
      <q-btn round icon="map" color="primary" @click="showCourseTransition" />
    </div>
  </div>
</template>

<script>
import { useRegatta } from "src/stores/regatta";

const regatta = useRegatta();

export default {
  name: "regattaSettingsEdit",

  setup() {
    return {
      regatta,
    };
  },

  methods: {
    showCourseTransition() {
      this.$router.push("course");
    },
  },
};
</script>
