<template>
  <q-card
    flat
    bordered
    square
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-6">
        <MarkNumber :number="roboStore.number"></MarkNumber>
        <q-toolbar-title>{{ roboStore.name }}</q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="col-6">
        <q-space />

        <BatteryStatus :battery="roboStore.battery" />
        <GPSStatus :positionvalid="roboStore.positionvalid" />
        <SignalStatus :signalstrength="roboStore.localrssi" />

        <router-link
          :to="{
            name: 'robobuoysettings',
            params: { deviceid: roboStore.deviceid },
          }"
        >
          <q-btn flat round dense color="white" icon="settings">
            <q-tooltip
              class="bg-dark text-white"
              anchor="top middle"
              self="bottom middle"
              >Settings</q-tooltip
            >
          </q-btn>
        </router-link>
      </q-toolbar>
    </div>

    <q-card-section class="fit row no-wrap justify-evenly">
      <CourseControl :deviceid="roboStore.deviceid"></CourseControl>
      <ThrustControl :deviceid="roboStore.deviceid"></ThrustControl>
    </q-card-section>

    <q-card-section class="fit row no-wrap justify-evenly">
      <ModeControl :deviceid="roboStore.deviceid"></ModeControl>
    </q-card-section>

    <!--q-card-actions
      class="fit row no-wrap justify-evenly items-center content-center"
    >
      <q-btn color="primary" icon="home" push
        ><q-tooltip class="bg-dark">go home</q-tooltip></q-btn
      >

      <q-btn color="primary" icon="campaign" push
        ><q-tooltip class="bg-dark">signal tone</q-tooltip></q-btn
      >

      <q-btn color="primary" icon="fluorescent" push
        ><q-tooltip class="bg-dark">signal light</q-tooltip></q-btn
      >
    </q-card-actions-->
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

import MarkNumber from "./status/MarkNumber.vue";
import BatteryStatus from "./status/BatteryStatus.vue";
import GPSStatus from "./status/GPSStatus.vue";
import SignalStatus from "./status/SignalStatus.vue";
import CourseControl from "./control/CourseControl.vue";
import ThrustControl from "./control/ThrustControl.vue";
import ModeControl from "./control/ModeControl.vue";

export default {
  name: "RobobuoyStatus",
  props: ["deviceid"],
  components: {
    MarkNumber,
    BatteryStatus,
    GPSStatus,
    SignalStatus,
    CourseControl,
    ThrustControl,
    ModeControl,
  },
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    return { roboStore };
  },
};
</script>

<style>
.rotated {
  transform: rotate(90deg);
}

.spin {
  animation-name: spin;
  animation-duration: 10000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
