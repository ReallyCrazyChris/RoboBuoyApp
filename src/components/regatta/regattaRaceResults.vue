<template>
  <q-table
    v-for="(race, index) in regattaresults.raceScore"
    v-bind:key="index"
    flat
    bordered
    :title="'Race ' + (index + 1)"
    :rows="race"
    :columns="tableColumns"
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

  {
    name: "crewnames",
    align: "left",
    label: "Crew",
    field: "crewnames",
  },

  {
    name: "points",
    align: "right",
    label: "Points",
    field: "points",
  },
];

export default {
  name: "regattaRaceResults",

  setup() {
    return { tableColumns, regattaresults };
  },

  computed: {},
};
</script>
