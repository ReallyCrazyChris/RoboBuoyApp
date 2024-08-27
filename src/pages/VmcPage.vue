<template>
  <q-page>
    <q-card flat>
      <q-card-section>
        <sogview />
      </q-card-section>

      <q-card-section>
        <vmcview />
      </q-card-section>

      <q-card-section>
        <efficiencyview />
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-5">
            <div class="text-caption">
              N {{ parseFloat(vmc.lat).toFixed(3) }}
            </div>
            <div class="text-caption">
              E {{ parseFloat(vmc.lon).toFixed(3) }}
            </div>
          </div>
          <div class="col-7 self-center">
            <q-btn
              round
              color="primary"
              size="sm"
              icon="room"
              @click="vmc.setCoordinates(gps.lon, gps.lat)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import sogview from "src/components/boat/sog.vue";
import vmcview from "src/components/boat/vmc.vue";
import efficiencyview from "src/components/boat/efficiency.vue";

export default defineComponent({
  name: "VmcPage",
  components: { sogview, vmcview, efficiencyview },
  setup() {
    return {};
  },
});
</script>
