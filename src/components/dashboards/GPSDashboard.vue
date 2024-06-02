<template>
  <div class="row">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h3 text-center text-positive">Position</div>
        <div class="text-h5 text-center text-positive">
          {{ gpsStore.lon }}
        </div>
        <div class="text-h5 text-center text-positive">
          {{ gpsStore.lat }}
        </div>
        <div class="text-h5 text-center text-positive">
          head:{{ gpsStore.heading }}
        </div>
        <div class="text-h5 text-center text-positive">
          speed:{{ gpsStore.speed }}
        </div>
        <div class="text-h5 text-center text-positive">
          accuracy: {{ gpsStore.accuracy }}
        </div>
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
const gpsStore = useGpsStore();

export default defineComponent({
  name: "VmcDashboard",
  components: {},
  setup() {
    return {
      vmcStore,
      markCollection,
      gpsStore,
    };
  },

  mounted() {
    gpsStore.watchPosition();
  },

  unmounted() {
    gpsStore.clearWatchPosition();
  },

  computed: {
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
