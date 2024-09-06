<template>
  <div class="row">
    <div class="col-10">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="raceinfo.name"
        label="name"
      ></q-input>
    </div>

    <div v-if="!readonly" class="col-2 text-center">
      <q-btn round icon="delete" color="primary" @click="raceinfo.reset()" />
    </div>

    <div class="col-12 q-mt-sm">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="raceinfo.description"
        label="description"
      />
    </div>

    <div class="col-10 q-mt-sm">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="raceinfo.dateTime"
        label="date and time"
        type="datetime-local"
      />
    </div>

    <div v-if="!readonly" class="col-2 q-mt-sm text-center">
      <q-btn
        round
        icon="today"
        color="primary"
        @click="raceinfo.presetDateTime()"
        ><q-tooltip class="bg-primary">current date & time</q-tooltip></q-btn
      >
    </div>

    <div class="col-6 q-mt-sm">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="raceinfo.earliestStartTime"
        class="q-pr-xs"
        type="time"
        label="earliest race start "
      />
    </div>

    <div class="col-6 q-mt-sm">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="raceinfo.latestStartTime"
        class="q-pl-xs"
        type="time"
        label="latest race start"
      />
    </div>
  </div>
</template>

<script>
import { useRaceInfo } from "src/stores/raceInfo";
import { readonly } from "vue";

const raceinfo = useRaceInfo();

export default {
  name: "regattaSettings",
  props: {
    readonly: Boolean,
  },

  setup() {
    return {
      raceinfo,
    };
  },
};
</script>
