<template>
  <q-page>
    <q-card
      flat
      class="row full-height justify-center items-center content-center"
    >
      <q-card-section class="full-height">
        <q-btn
          fab
          icon="campaign"
          color="primary"
          size=""
          @click="sounds.airhorn(1)"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useSounds } from "stores/sounds.js";

const sounds = useSounds();

export default defineComponent({
  name: "VmcDashboard",
  components: {},
  setup() {
    return {
      sounds,
    };
  },
});
</script>
