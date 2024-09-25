<template>
  <q-table
    flat
    bordered
    :title="'Regatta Results'"
    :rows="regattaresults.particiantScore"
    :columns="regattaresults.columns"
    row-key="id"
    :filter="regattaresults.filter"
    hide-bottom
    :pagination="{
      rowsPerPage: 0,
    }"
  />
</template>

<script>
import { useRegattaResults } from "src/stores/regattaResults";
const regattaresults = useRegattaResults();

export default {
  name: "regattaOverallResults",
  setup() {
    return { regattaresults };
  },
};
</script>
