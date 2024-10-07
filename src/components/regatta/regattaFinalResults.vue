<template>
  <q-table
    flat
    bordered
    :rows="regattaevent.overallraceResults"
    :columns="regattaevent.overallraceResultsColumns"
    row-key="id"
    :filter="regattaevent.filter"
    hide-bottom
    :pagination="{
      rowsPerPage: 0,
    }"
  />
</template>

<script>
import { useRegattaEvent } from "src/stores/regattaEvent";
const regattaevent = useRegattaEvent();

export default {
  name: "regattaOverallResults",
  setup() {
    return { regattaevent };
  },
};
</script>
