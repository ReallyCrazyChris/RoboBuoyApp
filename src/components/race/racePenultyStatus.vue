<template>
  <q-table
    flat
    bordered
    :title="'Race ' + regattaevent.currentrace.racenumber + ' Penalties'"
    :rows="regattaevent.currentraceResults"
    :columns="tableColumns"
    row-key="id"
    :filter="regattaevent.filter"
    hide-bottom
    :pagination="{
      rowsPerPage: 0,
    }"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="position" :props="props">
          {{ props.row.position }}
          <q-popup-edit v-model="props.row.position" v-slot="scope">
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>

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

        <q-td key="points" :props="props">
          <q-btn
            size="xs"
            class="q-mr-sm"
            color="positive"
            icon="undo"
            @click="regattaevent.revokeOCS(props.row.id)"
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
    name: "position",
    align: "left",
    label: "Penulty",
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
    label: "Actions",
    field: "points",
    sortable: true,
  },
];

export default {
  name: "racePenultyStatus",
  setup() {
    return { regattaevent, tableColumns };
  },
};
</script>
