<template>
  <div class="row">
    <q-card class="full-width">
      <q-card-section>
        <div
          class="full-width row wrap justify-start items-start content-start"
        >
          <div class="text-center col-12" style="font-size: 10rem">
            {{ vmc.vmc }}
          </div>

          <div
            v-if="marks.selected == 0"
            class="col-12 text-h5 text-center text-primary"
          >
            VMC
          </div>
          <div
            v-if="marks.selected == 1"
            class="col-12 text-h5 text-center text-positive"
          >
            VMC
          </div>
          <div
            v-if="marks.selected == 2"
            class="col-12 text-h5 text-center text-warning"
          >
            VMC
          </div>
        </div>

        <div class="text-center" style="font-size: 10rem">
          {{ vmc.efficiency }}
        </div>
        <div class="text-h5 text-center">EFFICIENCY</div>
      </q-card-section>
    </q-card>
  </div>

  <div>
    <MarksSelect></MarksSelect>
  </div>

  <q-page-sticky position="top-right" :offset="[18, 18]">
    <q-btn
      v-if="wakeLock == null"
      fab
      icon="lock_open"
      color="accent"
      @click="requestWakeLock()"
    />
    <q-btn
      v-if="!(wakeLock == null)"
      fab
      icon="lock"
      color="accent"
      @click="releaseWakeLock()"
    />
  </q-page-sticky>
</template>

<script>
import { defineComponent } from "vue";

import { useMarks } from "src/stores/marks";
import { useGps } from "src/stores/gps";
import { useVmc } from "src/stores/vmc";

import MarksSelect from "src/components/marks/MarksSelect.vue";

const marks = useMarks();
const gps = useGps();
const vmc = useVmc();

export default defineComponent({
  name: "VmcDashboard",
  components: {
    MarksSelect,
  },
  setup() {
    return {
      vmc,
      marks,
      gps,
      wakeLock: null,
    };
  },

  mounted() {
    gps.watchPosition();
    gps.$subscribe(() => {
      vmc.update(gps.lon, gps.lat, gps.heading, gps.sog);
    });
  },

  unmounted() {
    gps.clearWatchPosition();
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
