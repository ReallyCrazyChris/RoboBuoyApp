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
    <template v-slot:top>
      <div class="fit row">
        <q-btn
          class="col-2 text-left"
          color="positive"
          label="Join"
          @click="participantjoinTransition()"
        />
        <div class="col-1"></div>
        <q-input
          class="col-9 text-right"
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
      </div>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="allow" :props="props">
          <q-checkbox color="positive" disable v-model="props.row.allow" />
        </q-td>

        <q-td key="sailnumber" :props="props">
          {{ props.row.sailnumber }}
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
        </q-td>
        <q-td key="clubprefix" :props="props">
          {{ props.row.clubprefix }}
        </q-td>
        <q-td key="boatclass" :props="props">
          {{ props.row.boatclass }}
        </q-td>

        <!--q-td key="actions" :props="props">
          <q-btn
            round
            size="sm"
            color="primary"
            icon="edit"
            @click="regattaevent.removeParticipant(props.row)"
          ></q-btn>
        </q-td-->
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
  /**
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
   */
];

export default {
  name: "regattaParticipants",

  setup() {
    return {
      regattaevent,
      tableColumns,
    };
  },

  methods: {
    participantjoinTransition() {
      this.$router.push("participantjoin");
    },
  },
};
</script>
