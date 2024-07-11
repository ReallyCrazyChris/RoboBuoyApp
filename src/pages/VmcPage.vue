<template>
  <q-page>
    <q-card flat>
      <q-card-section>
        <div class="text-center text-h1 q-py-lg" style="font-size: 10rem">
          {{ vmc.vmc }}
        </div>
        <div class="text-center text-h5 q-py-xs">
          VMC {{ marks.selected + 1 }}
        </div>

        <div class="text-center text-h1 q-py-lg" style="font-size: 10rem">
          {{ vmc.efficiency }}
        </div>
        <div class="text-center text-h5 q-py-xs">EFFICIENCY</div>
      </q-card-section>
      <q-card-section>
        <MarksSelect></MarksSelect>
      </q-card-section>
    </q-card>

    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn
        v-if="wakeLock == null"
        fab
        icon="lock_open"
        color="accent"
        size="sm"
        @click="requestWakeLock()"
      />
      <q-btn
        v-if="!(wakeLock == null)"
        fab
        icon="lock"
        color="accent"
        size="sm"
        @click="releaseWakeLock()"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import { useVmc } from "src/stores/vmc";
import { useMarks } from "src/stores/marks";
import MarksSelect from "src/components/marks/MarksSelect.vue";

const vmc = useVmc();
const marks = useMarks();

export default defineComponent({
  name: "VmcDashboard",
  components: {
    MarksSelect,
  },
  setup() {
    return {
      vmc,
      marks,
      wakeLock: null,
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
