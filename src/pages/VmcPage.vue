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
          <div class="col-8">
            <div class="row">
              <div class="col-12 self-center">
                Pin the location of the vmc buoy
              </div>
              <div class="col-6 text-caption">
                N {{ parseFloat(vmc.lat).toFixed(3) }}
              </div>
              <div class="col-6 text-caption">
                E {{ parseFloat(vmc.lon).toFixed(3) }}
              </div>
            </div>
          </div>
          <div class="col-4 self-center text-right">
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

import { useGps } from "src/stores/gps";
import { useVmc } from "src/stores/vmc";
const gps = useGps();
const vmc = useVmc();

export default defineComponent({
  name: "VmcPage",
  components: { sogview, vmcview, efficiencyview },
  setup() {
    return { gps, vmc };
  },
});
</script>
