<template>
  <q-card
    flat
    class="regatta-view row content-start"
    style="min-height: inherit"
  >
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-6 text-h6 text-uppercase text-weight-bold">
          Participants
        </div>
        <div class="col-6 text-right">
          <q-btn label="edit" color="primary" @click="editTransition()" />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="col-12">
      <div class="fit row">
        <div class="col-12">
          <regattaParticipants />
        </div>
      </div>
    </q-card-section>

    <q-card-actions class="col-12 q-pt-sm">
      <div class="fit text-right">
        <q-btn
          class="q-mr-sm"
          color="positive"
          label="Race Timer"
          @click="racetimerTransition()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import regattaParticipants from "/src/components/regatta/regattaParticipants.vue";

import { useRegattaEvent } from "src/stores/regattaEvent";
const regattaevent = useRegattaEvent();

export default {
  name: "regattaPage",
  components: {
    regattaParticipants,
  },

  setup() {
    return { regattaevent };
  },

  methods: {
    editTransition() {
      this.$router.push("participantedit");
    },

    racetimerTransition() {
      this.$router.push("racetimer");
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
