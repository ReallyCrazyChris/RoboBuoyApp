<template>
  <div class="row">
    <q-card class="full-width">
      <q-card-section>
        <div
          class="full-width row wrap justify-start items-start content-start"
        >
          <div class="text-center col-12" style="font-size: 10rem">
            {{ vmcStore.vmc }}
          </div>

          <div
            v-if="vmcStore.selectedMarkId == 0"
            class="col-12 text-h3 text-center text-primary"
          >
            VMC
          </div>
          <div
            v-if="vmcStore.selectedMarkId == 1"
            class="col-12 text-h3 text-center text-positive"
          >
            VMC
          </div>
          <div
            v-if="vmcStore.selectedMarkId == 2"
            class="col-12 text-h3 text-center text-warning"
          >
            VMC
          </div>

          <div class="col-6 self-center text-right q-pa-sm">
            lon: {{ marks.getLonFor(0) }}
          </div>
          <div class="col-6 self-center text-left q-pa-sm">
            lat: {{ marks.getLatFor(0) }}
          </div>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="text-center" style="font-size: 10rem">
          {{ vmcStore.efficiency }}
        </div>
        <div class="text-h5 text-center">EFFICIENCY</div>
      </q-card-section>
      <q-separator inset />

      <q-card-section>
        <div
          class="full-width row wrap justify-start items-start content-start"
        >
          <div class="col-2 self-center q-pa-sm">
            <q-btn
              class="col-2 self-center"
              round
              push
              color="primary"
              label="1"
              @click="
                vmcStore.setNextCoordinates(
                  0,
                  marks.getLonFor(0),
                  marks.getLatFor(0)
                )
              "
            />
          </div>

          <div col-2 class="col-8 self-center q-pa-sm">
            <div>lon: {{ marks.getLonFor(0) }}</div>
            <div>lat: {{ marks.getLatFor(0) }}</div>
          </div>

          <div class="col-2 self-center q-pa-sm">
            <q-btn
              outline
              round
              color="primary"
              icon="room"
              @click="marks.setCoordinates(0, gps.lat, gps.lon)"
            />
          </div>

          <div class="col-2 self-center q-pa-sm">
            <q-btn
              round
              push
              color="positive"
              label="2"
              @click="
                vmcStore.setNextCoordinates(
                  1,
                  marks.getLonFor(1),
                  marks.getLatFor(1)
                )
              "
            />
          </div>
          <div col-2 class="col-8 self-start q-pa-sm">
            <div>lon: {{ marks.getLonFor(1) }}</div>
            <div>lat: {{ marks.getLatFor(1) }}</div>
          </div>
          <div class="col-2 self-center q-pa-sm">
            <q-btn
              outline
              round
              color="positive"
              icon="room"
              @click="marks.setCoordinates(1, gps.lat, gps.lon)"
            />
          </div>

          <div class="col-2 self-center q-pa-sm">
            <q-btn
              class="self-center"
              round
              push
              color="warning"
              label="3"
              @click="
                vmcStore.setNextCoordinates(
                  2,
                  marks.getLonFor(2),
                  marks.getLatFor(2)
                )
              "
            />
          </div>
          <div class="col-8 self-start q-pa-sm">
            <div>lon: {{ marks.getLonFor(2) }}</div>
            <div>lat: {{ marks.getLatFor(2) }}</div>
          </div>
          <div class="col-2 self-center q-pa-sm">
            <q-btn
              class="self-center"
              outline
              round
              color="warning"
              icon="room"
              @click="marks.setCoordinates(2, gps.lat, gps.lon)"
            />
          </div>
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

const marks = useMarkCollection();
const vmcStore = useVmcStore();
const gps = useGpsStore();

export default defineComponent({
  name: "VmcDashboard",
  components: {},
  setup() {
    return {
      vmcStore,
      marks,
      gps,
    };
  },

  mounted() {
    gps.$subscribe(() => {
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
