<template>
  <q-card flat class="regatta-view row content-start">
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-8 text-h6">Add Participant</div>
        <div class="col-4 text-right">
          <q-btn label="add" color="positive" @click="addParticipant()" />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="col-xs-12">
      <div class="fit">
        <div class="text-h6 text-grey">Sailors</div>
        <q-input
          :filled="!readonly"
          :readonly="readonly"
          dense
          v-model="regattaevent.participant.skippername"
          class="q-pt-xs"
          label="skipper name"
        />

        <q-input
          :filled="!readonly"
          :readonly="readonly"
          dense
          v-model="regattaevent.participant.crewnames"
          class="q-pt-xs"
          label="crew names"
        />
      </div>
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="fit">
        <div class="text-h6 text-grey">Boat</div>

        <q-input
          :filled="!readonly"
          :readonly="readonly"
          dense
          v-model="regattaevent.participant.sailnumber"
          class="q-pt-xs"
          label="Sail Number"
        />

        <q-input
          :filled="!readonly"
          :readonly="readonly"
          dense
          v-model="regattaevent.participant.boatclass"
          class="q-pt-xs"
          label="Boat Class"
        />

        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="fit">
        <div class="text-h6 text-grey">Club</div>
        <q-input
          :filled="!readonly"
          :readonly="readonly"
          dense
          v-model="regattaevent.participant.clubprefix"
          class="q-pt-xs"
          label="Club abbreviaiton "
        />
        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useRegattaEvent } from "src/stores/regattaEvent";
const regattaevent = useRegattaEvent();

export default {
  name: "addParticipant",
  props: {
    readonly: Boolean,
  },
  setup() {
    return { regattaevent };
  },
  methods: {
    addParticipant() {
      regattaevent.addParticipant(regattaevent.participant);
    },
  },
};
</script>

<style>
.q-field {
  &.q-field--readonly {
    &.q-field--standard {
      .q-field__control {
        &:before {
          border-bottom-style: none;
        }
      }
    }
  }
}

.regatta-view .q-select__dropdown-icon {
  visibility: hidden;
}
</style>
src/stores/regattaEvent
