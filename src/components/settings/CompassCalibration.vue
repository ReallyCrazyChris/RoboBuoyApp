<template>
  <q-card
    flat
    bordered
    class="q-my-md"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <q-card-section>
      <div class="">
        <div class="text-h6">Compass Calibration</div>
        <div class="text-caption">
          Once the robot is stopped an in the water
        </div>
        <div class="text-caption">you can start the calibration</div>
      </div>

      <q-card-actions>
        <q-btn
          :disabled="roboStore.mode != 'stop'"
          :loading="roboStore.mode == 'calibratemag'"
          class=""
          label="Calibrate"
          color="primary"
          icon="explore"
          @click="roboStore.setmode('calibratemag')"
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
