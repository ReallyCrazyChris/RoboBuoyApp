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
            class="col-12 text-h5 text-center text-primary"
          >
            VMC
          </div>
          <div
            v-if="vmcStore.selectedMarkId == 1"
            class="col-12 text-h5 text-center text-positive"
          >
            VMC
          </div>
          <div
            v-if="vmcStore.selectedMarkId == 2"
            class="col-12 text-h5 text-center text-warning"
          >
            VMC
          </div>

          <!--div class="col-6 self-center text-right q-pa-sm">
            lon: {{ marks.getLonFor(0) }}
          </div>
          <div class="col-6 self-center text-left q-pa-sm">
            lat: {{ marks.getLatFor(0) }}
          </div-->
        </div>

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

        <div class="col-2 self-center q-pa-sm">
          <q-btn round push color="info" icon="share" @click="share()" />
        </div>
      </q-card-section>
    </q-card>
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
import { defineComponent, defineProps } from "vue";
import { useVmcStore } from "src/stores/vmcStore";
import { useMarkCollection } from "src/stores/markCollection";
import { useGpsStore } from "src/stores/gpsStore";

const marks = useMarkCollection();
const vmcStore = useVmcStore();
const gps = useGpsStore();

export default defineComponent({
  name: "VmcDashboard",
  components: {},
  props: { config: String },
  setup() {
    return {
      vmcStore,
      marks,
      gps,
      wakeLock: null,
    };
  },

  mounted() {
    gps.$subscribe(() => {
      vmcStore.update(gps.lat, gps.lon, gps.heading, gps.speed);
    });
    gps.watchPosition();

    if (this.$route.query.config) {
      marks.decodeMarks(this.$route.query.config);
    }
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
    share() {
      const data = {
        title: "RoboBouy VMC",
        text: "Velocity Made Course App",
        url:
          "https://reallycrazychris.github.io/#/vmc?config=" +
          marks.encodeMarks(),
      };

      navigator.share(data);
    },
  },
});
</script>
