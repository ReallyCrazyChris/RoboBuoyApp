<template>
  <div class="fit row wrap justify-start items-center content-center q-pt-sm">
    <div class="col-12">
      <q-input
        readonly
        dense
        v-model="regatta.description"
        label="description"
      />
    </div>

    <div class="col-12">
      <q-input
        readonly
        dense
        v-model="regatta.localDate"
        label="date and time"
        type="text"
      ></q-input>
    </div>

    <div class="col-6">
      <q-input
        readonly
        dense
        v-model="regatta.earliestStartTime"
        class="q-pr-xs"
        type="text"
        label="earliest race start "
      />
    </div>

    <div class="col-6">
      <q-input
        readonly
        dense
        v-model="regatta.latestStartTime"
        class="q-pl-xs"
        type="text"
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
