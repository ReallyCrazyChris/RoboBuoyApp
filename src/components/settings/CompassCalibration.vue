<template>
  <q-card
    flat
    bordered
    class="q-my-md"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <q-card-section>
      <div class="q-pa-md col items-center no-wrap">
        <div class="">
          <div class="text-h6">Compass Calibration</div>
          <div class="text-caption">start the calibration</div>
          <div class="text-caption">
            rotate the RoboBouy about is axis a few times
          </div>
          <div class="text-caption">during the calibration process</div>
        </div>
        <q-btn
          :loading="roboStore.mode == 'calibratemag'"
          class="q-mt-md"
          push
          glossy
          label="Calibrate Compass"
          color="primary"
          icon="explore"
          @click="roboStore.setmode('calibratemag')"
        >
          <template v-slot:loading>
            <q-spinner-gears class="q-mx-xs" />
            <div class="q-mx-xs">Calibrating Compass</div>
          </template>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

export default {
  name: "CompassCalibration",
  props: ["deviceid"],
  components: {},

  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    return {
      roboStore,
    };
  },
};
</script>
