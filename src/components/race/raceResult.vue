<template>
  <q-table
    flat
    bordered
    :title="'Race ' + regattaevent.currentrace.racenumber + ' Result'"
    :rows="regattaevent.currentraceResults"
    :columns="tableColumns"
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
    name: "points",
    align: "left",
    label: "Points",
    field: "points",
    sortable: true,
  },
];

export default {
  name: "regattaScore",
  setup() {
    return { regattaevent, tableColumns };
  },
};
</script>
