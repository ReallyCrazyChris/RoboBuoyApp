<template>
  <q-page>
    <q-card flat>
      <q-card-section class="row fit justify-start items-center">
        <div class="col-6" style="font-size: 10vmin">SOG:</div>
        <div
          class="col-6 text-center"
          style="font-size: 30vmin; line-height: 5rem"
        >
          {{ vmc.sog }}
        </div>
      </q-card-section>

      <q-card-section class="row fit justify-start items-center">
        <div class="col-6">
          <div style="font-size: 10vmin">VMC:</div>
          <div class="row fit">
            <div v-if="vmc.lon == 0 || vmc.lat == 0" class="col-8 text-caption">
              set the windward mark coordinates
            </div>
            <div v-else class="col-8">
              <div class="text-caption">
                N {{ parseFloat(vmc.lat).toFixed(3) }}
              </div>
              <div class="text-caption">
                E {{ parseFloat(vmc.lon).toFixed(3) }}
              </div>
            </div>

            <div class="col-4 self-end">
              <q-btn
                round
                color="primary"
                icon="room"
                @click="vmc.setCoordinates(gps.lon, gps.lat)"
              />
            </div>
          </div>
        </div>

        <div
          v-if="vmc.lon == 0 || vmc.lat == 0"
          class="col-6 text-center"
          style="font-size: 30vmin; line-height: 5rem"
        >
          -
        </div>
        <div
          v-else
          class="col-6 text-center"
          style="font-size: 30vmin; line-height: 5rem"
        >
          {{ vmc.vmc }}
        </div>
      </q-card-section>

      <q-card-section class="row fit justify-start items-center">
        <div class="col-6">
          <div style="font-size: 10vmin">Efficiency:</div>
        </div>

        <div
          v-if="vmc.lon == 0 || vmc.lat == 0"
          class="col-6 text-center"
          style="font-size: 30vmin; line-height: 5rem"
        >
          -
        </div>
        <div
          v-else
          class="col-6 text-center"
          style="font-size: 30vmin; line-height: 5rem"
        >
          {{ vmc.vmc }}
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import { useGps } from "src/stores/gps";
import { useVmc } from "src/stores/vmc";
const gps = useGps();
const vmc = useVmc();

export default defineComponent({
  name: "VmcDashboard",
  components: {},
  setup() {
    return {
      vmc,
      gps,
    };
  },

  unmounted() {
    this.releaseWakeLock();
  },

  methods: {
    async requestWakeLock() {
      try {
        console.log("requestWakeLock");
        this.wakeLock = await navigator.wakeLock.request("screen");
      } catch (err) {
        releaseWakeLock();
      }
    },
    releaseWakeLock() {
      if (this.wakeLock != null) {
        console.log("releaseWakeLock");
        this.wakeLock.release();
        this.wakeLock = null;
      }
    },
  },
});
</script>
