<template>
  <div class="row">
    <div class="col-10">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="regattainfo.name"
        label="name"
      ></q-input>
    </div>

    <div v-if="!readonly" class="col-2 text-center">
      <q-btn round icon="delete" color="primary" @click="regattainfo.reset()" />
    </div>

    <div class="col-12 q-mt-sm">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="regattainfo.description"
        label="description"
      />
    </div>

    <div class="col-10 q-mt-sm">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="regattainfo.dateTime"
        label="date and time"
        type="datetime-local"
      />
    </div>

    <div v-if="!readonly" class="col-2 q-mt-sm text-center">
      <q-btn
        round
        icon="today"
        color="primary"
        @click="regattainfo.presetDateTime()"
        ><q-tooltip class="bg-primary">current date & time</q-tooltip></q-btn
      >
    </div>

    <div class="col-6 q-mt-sm">
      <q-input
        :filled="!readonly"
        :readonly="readonly"
        dense
        v-model="regattainfo.earliestStartTime"
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
        v-model="regattainfo.latestStartTime"
        class="q-pl-xs"
        type="time"
        label="latest race start"
      />
    </div>
  </div>
</template>

<script>
import { useRegattaInfo } from "src/stores/regattaInfo";
import { readonly } from "vue";

const regattainfo = useRegattaInfo();

export default {
  name: "regattaInfo",
  props: {
    readonly: Boolean,
  },

  setup() {
    return {
      regattainfo,
    };
  },
};
</script>
