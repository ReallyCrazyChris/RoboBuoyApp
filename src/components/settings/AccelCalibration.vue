<template>
  <q-card
    flat
    bordered
    class="q-my-md"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <q-card-section>
      <div class="">
        <div class="text-h6">Accelerometer Calibration</div>
        <div class="text-caption">
          The Robot needs to be in its charge cradel
        </div>
        <div class="text-caption">
          The robot and the charge cradel need to be on a flat surface
        </div>
      </div>

      <q-card-actions>
        <q-btn
          :disabled="roboStore.mode != 'stop'"
          :loading="roboStore.mode == 'calibrateaccel'"
          class=""
          label="Calibrate"
          color="primary"
          icon="3d_rotation"
          @click="roboStore.setmode('calibrateaccel')"
        >
          <template v-slot:loading>
            <q-spinner-gears class="q-mx-xs" />
          </template>
        </q-btn>
        <q-btn
          label="stop"
          color="primary"
          icon="stop"
          @click="roboStore.setmode('stop')"
        >
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

export default {
  name: "AccelCalibration",
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
