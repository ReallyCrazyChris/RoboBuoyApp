<template>
  <q-card-section
    class="q-pa-none q-pb-md"
    v-for="(race, index) in regattaevent.races"
    v-bind:key="index"
  >
    <q-table
      flat
      bordered
      :title="'Race ' + race.racenumber"
      :rows="race.results"
      :columns="tableColumns"
      row-key="id"
      :filter="regattaevent.filter"
      hide-bottom
      :pagination="{
        rowsPerPage: 0,
      }"
    />
  </q-card-section>
</template>

<script>
import { useRegattaEvent } from "/src/stores/regattaEvent";
const regattaevent = useRegattaEvent();

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
    return { tableColumns, regattaevent };
  },
};
</script>
