<template>
  <div class="fit row wrap justify-start items-center content-center q-pt-sm">
    <div class="col-12">
      <q-input
        :filled="!readonly"
        :readonly
        dense
        v-model="participant.crewnames"
        class="q-pb-sm"
        label="crew names"
      ></q-input>
    </div>

    <div class="col-12">
      <q-input
        :filled="!readonly"
        :readonly
        dense
        v-model="participant.sailnumber"
        class="q-pb-sm"
        label="sail number"
      />
    </div>
  </div>
</template>

<script>
import { useParticipant } from "src/stores/participant";

const participant = useParticipant();

export default {
  name: "participantJoin",
  props: ["readonly"],
  setup() {
    return {
      participant,
    };
  },
};
</script>
