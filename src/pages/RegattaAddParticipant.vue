<template>
  <q-page>
    <q-card
      flat
      class="regatta-view row content-start"
      style="min-height: inherit"
    >
      <q-card-section class="col-12">
        <div>
          <addRegattaParticipant />
        </div>
        <q-separator class="q-mt-sm" />
      </q-card-section>

      <q-card-section class="col-12">
        <div class="fit">
          <div class="text-h6 text-uppercase text-grey">Participants</div>
          <regattaParticipants />
          <q-separator class="xs q-mt-sm" />
        </div>
      </q-card-section>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        icon="arrow_back"
        color="primary"
        @click="backTransition()"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

import addRegattaParticipant from "src/components/regatta/addRegattaParticipant.vue";
import regattaParticipants from "/src/components/regatta/regattaParticipants.vue";

import { useRaceCourse } from "src/stores/raceCourse";
const cource = useRaceCourse();

export default defineComponent({
  name: "RegattaAddParticipant",
  components: {
    addRegattaParticipant,
    regattaParticipants,
  },
  setup() {
    return {};
  },
  methods: {
    backTransition() {
      this.$router.go(-1);
    },
  },
});
</script>
<style></style>
src/stores/raceCourse
