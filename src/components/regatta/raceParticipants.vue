<template>
  <q-table
    v-if="participants.racing.length > 0"
    flat
    bordered
    title="Race Participants"
    :rows="participants.racing"
    :columns="tableColumns"
    :filter="participants.filter"
    row-key="id"
    hide-bottom
  >
    <template v-slot:top-right>
      <q-input
        bordered
        dense
        debounce="300"
        color="primary"
        v-model="participants.filter"
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
            @click="participants.ocs(props.row)"
          ></q-btn>
          <q-btn
            size="xs"
            round
            class="q-mr-sm"
            color="negative"
            label="DNF"
            @click="participants.dnf(props.row)"
          ></q-btn>
          <q-btn
            size="sm"
            color="positive"
            icon="sports_score"
            @click="participants.finish(props.row)"
          ></q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { useRaceParticipants } from "src/stores/raceParticipants";

const participants = useRaceParticipants();

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
  name: "raceParticipants",

  setup() {
    return { participants, tableColumns };
  },

  computed: {},
  methods: {
    onFinish(row) {},
  },
};
</script>
