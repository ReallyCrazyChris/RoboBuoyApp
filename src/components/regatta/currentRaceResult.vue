<template>
  <q-table
    v-if="racescore.result.length > 0"
    flat
    bordered
    :title="'Race ' + racescore.racenumber + ' Result'"
    :rows="racescore.result"
    :columns="tableColumns"
    row-key="id"
    :filter="racescore.filter"
    hide-bottom
    :pagination="{
      rowsPerPage: 0,
    }"
  />
</template>

<script>
import { useRaceScore } from "src/stores/raceScore";
const racescore = useRaceScore();

import { useRegattaResults } from "src/stores/regattaResults";
const regattaresults = useRegattaResults();

const tableColumns = [
  {
    name: "position",
    align: "left",
    label: "Place",
    field: "position",
    sortable: true,
  },

  {
    name: "sailnumber",
    align: "left",
    label: "Sail",
    field: "sailnumber",
    sortable: true,
  },
  {
    name: "skippername",
    align: "left",
    label: "Skipper",
    field: "skippername",
    sortable: true,
  },
];

export default {
  name: "regattaScore",
  setup() {
    return { racescore, regattaresults, tableColumns };
  },
};
</script>
