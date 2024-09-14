<template>
  <q-table
    v-if="raceparticipants.finished.length > 0"
    flat
    bordered
    title="Race Results"
    :rows="raceparticipants.finished"
    :columns="tableColumns"
    row-key="id"
    :filter="raceparticipants.filter"
    hide-bottom
  />
  <q-btn
    color="positive"
    label="commit results"
    @click="regattaresults.add(raceparticipants)"
  ></q-btn>
</template>

<script>
import { useRaceParticipants } from "src/stores/raceParticipants";
import { useRegattaResults } from "src/stores/regattaResults";

const raceparticipants = useRaceParticipants();
const regattaresults = useRegattaResults();

const tableColumns = [
  {
    name: "position",
    align: "left",
    label: "Place",
    field: (item) => {
      return item.position;
    },

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
  name: "raceResults",

  setup() {
    return { raceparticipants, tableColumns, regattaresults };
  },

  computed: {},
};
</script>
