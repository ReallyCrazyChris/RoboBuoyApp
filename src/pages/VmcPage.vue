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
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import sogview from "src/components/boat/sog.vue";
import vmcview from "src/components/boat/vmc.vue";
import efficiencyview from "src/components/boat/efficiency.vue";

export default defineComponent({
  name: "VmcDashboard",
  components: { sogview, vmcview, efficiencyview },
  setup() {
    return {};
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
