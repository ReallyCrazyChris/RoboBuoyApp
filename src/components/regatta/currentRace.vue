<template>
  <q-table
    flat
    bordered
    :title="'Current Race ' + regattaevent.currentrace.racenumber"
    :rows="regattaevent.currentraceParticipants"
    :columns="tableColumns"
    :filter="regattaevent.filter"
    row-key="id"
    hide-bottom
    :pagination="{
      rowsPerPage: 0,
    }"
  >
    <template v-slot:top-right>
      <q-input
        bordered
        dense
        debounce="300"
        color="primary"
        v-model="regattaevent.filter"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="sailnumber" :props="props">
          {{ props.row.sailnumber }}
          <q-popup-edit v-model="props.row.sailnumber" v-slot="scope">
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
        <q-td key="skippername" :props="props">
          {{ props.row.skippername }}
          <q-popup-edit
            v-model="props.row.skippername"
            title="Skipper name"
            buttons
            v-slot="scope"
          >
            <q-input v-model="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>

        <q-td key="finish" :props="props">
          <q-btn
            size="xs"
            round
            class="q-mr-sm"
            color="warning"
            label="OCS"
            @click="regattaevent.raceOCS(props.row.id)"
          ></q-btn>
          <q-btn
            size="xs"
            round
            class="q-mr-sm"
            color="negative"
            label="DNF"
            @click="regattaevent.raceDNF(props.row.id)"
          ></q-btn>
          <q-btn
            size="sm"
            color="positive"
            icon="sports_score"
            @click="regattaevent.raceFinish(props.row.id)"
          ></q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { useRegattaEvent } from "src/stores/regattaEvent";
const regattaevent = useRegattaEvent();

const tableColumns = [
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
  { name: "finish", align: "right", label: "Finish" },
];

export default {
  name: "raceResults",
  setup() {
    return { regattaevent, tableColumns };
  },
};
</script>
