<template>
  <q-page padding>
    <q-card
      flat
      bordered
      class="q-my-md"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
    >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ roboStore.name }}</div>
            <div class="text-caption">settings</div>
          </div>
        </div>
      </q-card-section>

      <q-separator />
    </q-card>

    <GPSDashboard :deviceid="deviceid" />
    <RobobuoyStatus :deviceid="deviceid"></RobobuoyStatus>
    <HoldSettings :deviceid="deviceid" />
    <PIDSettings :deviceid="deviceid" />
    <MotorSettings :deviceid="deviceid" />
    <AlphaSettings :deviceid="deviceid" />
    <CompassCalibration :deviceid="deviceid" />
    <DeclinationCalibration :deviceid="deviceid" />
    <AccelCalibration :deviceid="deviceid" />
    <GyroCalibration :deviceid="deviceid" />
    <CompassDashboard :deviceid="deviceid"></CompassDashboard>
  </q-page>
</template>

<script>
import { useRoboStore } from "stores/roboStore";
import RobobuoyStatus from "src/components/robobuoy/RobobuoyStatus.vue";
import AlphaSettings from "src/components/settings/AlphaSettings.vue";
import HoldSettings from "src/components/settings/HoldSettings.vue";
import PIDSettings from "src/components/settings/PIDSettings.vue";
import MotorSettings from "src/components/settings/MotorSettings.vue";
import CompassCalibration from "src/components/settings/CompassCalibration.vue";
import DeclinationCalibration from "src/components/settings/DeclinationCalibration.vue";
import AccelCalibration from "src/components/settings/AccelCalibration.vue";
import GyroCalibration from "src/components/settings/GyroCalibration.vue";
import CompassDashboard from "src/components/dashboards/CompassDashboard.vue";
import GPSDashboard from "src/components/dashboards/GPSDashboard.vue";
export default {
  name: "RoboBuoySettingsPage",
  props: ["deviceid"],
  components: {
    RobobuoyStatus,
    AlphaSettings,
    HoldSettings,
    PIDSettings,
    MotorSettings,
    CompassCalibration,
    DeclinationCalibration,
    AccelCalibration,
    GyroCalibration,
    CompassDashboard,
    GPSDashboard,
  },

  setup(props) {
    const roboStore = useRoboStore(props.deviceid);

    return {
      roboStore,
    };
  },
};
</script>
