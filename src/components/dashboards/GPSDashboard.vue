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
let screenLock;

async function getScreenLock() {
  if ("wakeLock" in navigator) {
    try {
      screenLock = await navigator.wakeLock.request("screen");
    } catch (err) {
      console.log(err.name, err.message);
    }
    return screenLock;
  }
}

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
    getScreenLock();
    document.documentElement.requestFullscreen();
  },

  unmounted() {
    gpsStore.clearWatchPosition();
    screenLock.release();
    document.exitFullscreen();
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
src/stores/vmc src/stores/gps
