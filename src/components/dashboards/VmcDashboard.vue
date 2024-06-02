<template>
  <div class="row">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h3 text-center text-positive">VMC</div>
        <div class="text-h5 text-center text-positive">
          {{ markCollection.nextmark.label }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h1 text-center">{{ vmcStore.vmc }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h3 text-center text-info">SOG</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h1 text-center">{{ vmcStore.sog }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h3 text-center text-negative">RISK %</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h1 text-center">{{ vmcStore.risk }}</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-option-group
          v-model="markSelected"
          :options="markCollection.options"
          color="green"
        >
        </q-option-group>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useVmcStore } from "src/stores/vmcStore";
import { useMarkCollection } from "src/stores/markCollection";
import { useGpsStore } from "src/stores/gpsStore";

const markCollection = useMarkCollection();
const vmcStore = useVmcStore();
const gps = useGpsStore();

export default defineComponent({
  name: "VmcDashboard",
  components: {},
  setup() {
    return {
      vmcStore,
      markCollection,
      gps,
    };
  },

  mounted() {
    gps.watchPosition();
  },

  unmounted() {
    gps.clearWatchPosition();
  },

  computed: {
    speed: {
      get() {
        vmcStore.update(gps.lat, gps.lon, gps.heading, gps.speed);
        return gps.speed;
      },
    },
    markSelected: {
      get() {
        return markCollection.nextmark.id;
      },
      set(id) {
        markCollection.selectMark(id);
      },
    },
  },
});
</script>
