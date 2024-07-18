<template>
  <q-page>
    <q-card flat>
      <q-card-section>
        <sogview :vmc="vmc" />
      </q-card-section>

      <q-card-section>
        <vmcview :vmc="vmc" :gps="gps" />
      </q-card-section>

      <q-card-section>
        <efficiencyview :vmc="vmc" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import sogview from "src/components/vmc/sog.vue";
import vmcview from "src/components/vmc/vmc.vue";
import efficiencyview from "src/components/vmc/efficiency.vue";

import { useGps } from "src/stores/gps";
import { useVmc } from "src/stores/vmc";
const gps = useGps();
const vmc = useVmc();

export default defineComponent({
  name: "VmcDashboard",
  components: { sogview, vmcview, efficiencyview },
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
