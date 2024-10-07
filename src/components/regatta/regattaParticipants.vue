<template>
  <q-table
    flat
    bordered
    :rows="regattaevent.participants"
    :columns="tableColumns"
    :filter="regattaevent.filter"
    row-key="id"
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
        <q-td key="allow" :props="props">
          <q-toggle color="positive" v-model="props.row.allow" />
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

        <q-td key="crewnames" :props="props">
          {{ props.row.crewnames }}
          <q-popup-edit
            v-model="props.row.crewnames"
            title="Crew name(s)"
            buttons
            v-slot="scope"
          >
            <q-input v-model="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>
        <q-td key="clubprefix" :props="props">
          {{ props.row.clubprefix }}
          <q-popup-edit
            v-model="props.row.clubprefix"
            title="Club"
            buttons
            v-slot="scope"
          >
            <q-input v-model="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>
        <q-td key="boatclass" :props="props">
          {{ props.row.boatclass }}
          <q-popup-edit
            v-model="props.row.boatclass"
            title="Class"
            buttons
            v-slot="scope"
          >
            <q-input v-model="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>
        <q-td key="role" :props="props">
          {{ props.row.role }}
          <q-popup-edit
            v-model="props.row.role"
            title="Role"
            buttons
            v-slot="scope"
          >
            <q-input v-model="scope.value" dense autofocus />
          </q-popup-edit>
        </q-td>

        <q-td key="actions" :props="props">
          <q-btn
            round
            size="sm"
            color="negative"
            icon="delete"
            @click="regattaevent.removeParticipant(props.row)"
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
    name: "allow",
    align: "center",
    label: "Allow",
    field: "allow",
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
    sortable: true,
  },
  {
    name: "clubprefix",
    align: "left",
    label: "Club",
    field: "clubprefix",
    sortable: true,
  },
  {
    name: "boatclass",
    align: "left",
    label: "Class",
    field: "boatclass",
    sortable: true,
  },
  {
    name: "role",
    align: "left",
    label: "Role",
    field: "role",
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "Actions",
  },
];

export default {
  name: "regattaParticipants",

  setup() {
    return {
      regattaevent,
      tableColumns,
    };
  },
};
</script>
