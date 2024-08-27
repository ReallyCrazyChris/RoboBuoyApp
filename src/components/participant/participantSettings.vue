<template>
  <div class="row q-py-md">
    <div class="col-12">
      <q-input
        class="q-pb-sm"
        filled
        v-model="participant.crewnames"
        label="crew names [ e.g.  alina rogers, john jakobs]"
        type="text"
      />
    </div>

    <div class="col-12">
      <q-input
        filled
        v-model="participant.sailnumber"
        label="sail number"
        type="text"
      />
    </div>
  </div>
</template>

<script>
import { useParticipant } from "src/stores/participant";
const participant = useParticipant();

export default {
  name: "participantSettings",

  setup() {
    return {
      participant,
    };
  },
};
</script>
