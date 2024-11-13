<template>
  <q-page>
    <q-card flat class="row content-start" style="min-height: inherit">
      <q-card-section class="col-xs-12 col-md-6">
        <div class="text-h6 text-uppercase text-grey">Race Penulty</div>
        <div class="text-right">
          <racePenulty />
        </div>

        <q-separator class="xs q-mt-sm" />
      </q-card-section>

      <q-card-section class="col-xs-12 col-md-6">
        <div class="fit">
          <div class="text-h6 text-uppercase text-grey">Penulty Status</div>
          <racePenultyStatus />
          <q-separator class="xs q-mt-sm" />
        </div>
      </q-card-section>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          round
          icon="arrow_back"
          color="primary"
          @click="backTransition()"
        />
      </q-page-sticky>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import racePenulty from "/src/components/race/racePenulty.vue";
import racePenultyStatus from "/src/components/race/racePenultyStatus.vue";

import { useRaceTimer } from "src/stores/raceTimer";
import { useRegattaEvent } from "src/stores/regattaEvent";

const racetimer = useRaceTimer();
const regattaevent = useRegattaEvent();

export default defineComponent({
  name: "RegattaPenultyPage",
  components: {
    racePenulty,
    racePenultyStatus,
  },
  setup() {
    return { regattaevent };
  },

  methods: {
    backTransition() {
      this.$router.go(-1);
    },
  },
});
</script>
