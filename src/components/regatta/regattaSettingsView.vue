<template>
  <div class="fit row wrap justify-start items-center content-center q-pt-sm">
    <div class="col-12">
      <q-input
        readonly
        filled
        dense
        v-model="regatta.description"
        class="q-pb-sm"
        label="description"
      />
    </div>

    <div class="col-12 q-pb-sm q-pr-sm">
      <q-input
        readonly
        filled
        dense
        v-model="regatta.dateTime"
        label="date and time"
        type="datetime-local"
      />
    </div>

    <div class="col-6">
      <q-input
        readonly
        filled
        dense
        v-model="regatta.earliestStartTime"
        class="q-pr-xs"
        type="time"
        label="earliest race start "
      />
    </div>

    <div class="col-6">
      <q-input
        readonly
        filled
        dense
        v-model="regatta.latestStartTime"
        class="q-pl-xs"
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
  name: "regattaSettings",

  setup() {
    return {
      regatta,
    };
  },
};
</script>
<style>
.q-field {
  &.q-field--readonly {
    &.q-field--filled {
      .q-field__control {
        &:before {
          border: none;
        }
      }
    }
  }
}
</style>
