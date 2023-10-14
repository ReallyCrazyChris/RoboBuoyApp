<template>
  <q-card
    flat
    bordered
    square
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-6">
        <MarkerNumber :number="roboStore.number"></MarkerNumber>
        <q-toolbar-title>{{ roboStore.name }}</q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="col-6">
        <q-space />

        <BatteryStatus :battery="roboStore.battery" />
        <GPSStatus :positionvalid="roboStore.positionvalid" />
        <SignalStrength :signalstrength="roboStore.localrssi" />

        <router-link
          :to="{
            name: 'robobuoysettings',
            params: { deviceid: roboStore.deviceid },
          }"
        >
          <q-btn flat round dense color="white" icon="settings">
            <q-tooltip class="bg-dark text-white">Settings</q-tooltip>
          </q-btn>
        </router-link>
      </q-toolbar>
    </div>

    <q-card-section
      class="fit row no-wrap justify-evenly items-center content-center"
    >
      <CourseControl :deviceid="roboStore.deviceid"></CourseControl>
      <ThrustControl :deviceid="roboStore.deviceid"></ThrustControl>
    </q-card-section>

    <q-card-actions
      class="fit row no-wrap justify-evenly items-center content-center"
    >
      <ModeControl :deviceid="roboStore.deviceid"></ModeControl>
    </q-card-actions>

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
import MarkerNumber from "components/robobuoy/MarkerNumber.vue";
import BatteryStatus from "components/robobuoy/BatteryStatus.vue";
import GPSStatus from "components/robobuoy/GPSStatus.vue";
import SignalStrength from "components/robobuoy/SignalStrength.vue";
import CourseControl from "components/robobuoy/CourseControl.vue";
import ThrustControl from "components/robobuoy/ThrustControl.vue";
import ModeControl from "components/robobuoy/ModeControl.vue";

export default {
  name: "RoboBuoyStatus",
  props: ["deviceid"],
  components: {
    MarkerNumber,
    BatteryStatus,
    GPSStatus,
    SignalStrength,
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
