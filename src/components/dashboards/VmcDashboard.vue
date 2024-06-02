<template>
  <div class="row">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-center" style="font-size: 15rem">
          {{ vmcStore.vmc }}
        </div>
        <div class="text-h3 text-center">VMC</div>
        <div
          v-if="vmcStore.selected == 1"
          class="text-h5 text-center text-primary"
        >
          Mark 1
        </div>
        <div
          v-if="vmcStore.selected == 2"
          class="text-h5 text-center text-positive"
        >
          Mark 2
        </div>
        <div
          v-if="vmcStore.selected == 3"
          class="text-h5 text-center text-warning"
        >
          Mark 3
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="text-center" style="font-size: 8rem">
          {{ vmcStore.efficiency }}
        </div>
        <div class="text-h5 text-center">EFFICIENCY</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row">
          <q-btn class="self-center" square push color="primary" label="1" />
          <div col-2 class="q-pa-sm col-9 self-start">
            <div>lon: 10.69627211119363</div>
            <div>lat: 49.69627211119363</div>
          </div>

          <q-btn
            class="self-center"
            outline
            round
            color="primary"
            icon="room"
          />
        </div>

        <div class="row">
          <q-btn class="self-center" square color="positive" label="2" />
          <div col-2 class="q-pa-sm col-9 self-start">
            <div>lon: 10.69627211119363</div>
            <div>lat: 49.69627211119363</div>
          </div>

          <q-btn
            class="self-center"
            outline
            round
            color="positive"
            icon="room"
          />
        </div>

        <div class="row">
          <q-btn class="self-center" square color="warning" label="3" />
          <div col-2 class="q-pa-sm col-9 self-start">
            <div>lon: 10.69627211119363</div>
            <div>lat: 49.69627211119363</div>
          </div>

          <q-btn
            class="self-center"
            outline
            round
            color="warning"
            icon="room"
          />
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
    gps.$subscribe(() => {
      console.log(gps);
      vmcStore.update(gps.lat, gps.lon, gps.heading, gps.speed);
    });
    gps.watchPosition();
  },

  unmounted() {
    gps.clearWatchPosition();
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
