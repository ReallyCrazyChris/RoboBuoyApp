<template>
  <q-card
    flat
    bordered
    class="q-my-md"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <q-card-section>
      <div class="">
        <div class="text-h6">Declination Calibration</div>
        <div class="text-caption">While the Robot is under way,</div>
        <div class="text-caption">press Calibrate to set the compass</div>
        <div class="text-caption">declination based on the the GPS Heading</div>
      </div>

      <q-card-actions>
        <q-btn
          class=""
          label="Calibrate"
          color="primary"
          icon="explore"
          @click="setDeclination()"
        >
          <template v-slot:loading>
            <q-spinner-gears class="q-mx-xs" />
          </template>
        </q-btn>

        <q-btn
          label="reset"
          color="primary"
          icon="clear"
          @click="clearDeclination()"
        >
        </q-btn>

        <q-btn
          label="save"
          color="primary"
          icon="save"
          @click="roboStore.savesettings()"
        >
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

export default {
  name: "DeclinationCalibration",
  props: ["deviceid"],
  components: {},

  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    return {
      roboStore,
    };
  },

  methods: {
    setDeclination() {
      this.roboStore.setmagdeclination(
        this.roboStore.gpscourse - this.roboStore.magcourse
      );
    },

    clearDeclination() {
      this.roboStore.setmagdeclination(0);
    },
  },
};
</script>
