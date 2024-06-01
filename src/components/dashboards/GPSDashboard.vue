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
          {{ gpsStore.accuracy }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h3 text-center text-negative">Speed</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h1 text-center">{{ gpsStore.speed }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h3 text-center text-info">Heading</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h1 text-center">{{ gpsStore.heading }}</div>
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

gpsStore.watchPosition();

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
