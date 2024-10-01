<template>
  <q-card flat class="regatta-view row content-start">
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-8 text-h6">Join Regatta</div>
        <div class="col-4 text-right">
          <q-btn
            v-if="!!!participant.id"
            label="join"
            color="primary"
            @click="save()"
          />
          <q-btn v-else label="update" color="primary" @click="save()" />
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
          v-model="participant.skippername"
          class="q-pt-xs"
          label="skipper name"
        />

        <q-input
          :filled="!readonly"
          :readonly="readonly"
          dense
          v-model="participant.crewnames"
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
          v-model="participant.sailnumber"
          class="q-pt-xs"
          label="Sail Number"
        />

        <q-input
          :filled="!readonly"
          :readonly="readonly"
          dense
          v-model="participant.boatclass"
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
          v-model="participant.clubprefix"
          class="q-pt-xs"
          label="Club abbreviaiton "
        />
        <q-separator class="xs q-mt-sm" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  participantFactory,
  useRegattaParticipant,
} from "src/stores/regattaParticipant";
const participant = useRegattaParticipant();

export default {
  name: "regattaParticipant",
  props: {
    readonly: Boolean,
  },
  setup() {
    return { participant };
  },
  methods: {
    save() {
      participant.save();
      regattareuslts.addParticipant(
        JSON.parse(JSON.stringify(participant.$state))
      );
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
