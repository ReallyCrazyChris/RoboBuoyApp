<template>
  <q-card flat :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
    <div class="fit row wrap justify-evenly items-start content-center">
      <!--div class="col-2 text-center self-center">
        <q-avatar
          size="100px"
          font-size="52px"
          color="primary"
          text-color="white"
          icon="anchor"
        >
        </q-avatar>
      </div-->
      <div class="col-2 text-center self-center">
        <q-avatar
          size="100px"
          font-size="25px"
          color="primary"
          text-color="white"
        >
          {{ roboStore.speed }}
        </q-avatar>
      </div>
      <div class="col-2 text-center self-center">
        <q-circular-progress
          show-value
          class="text-white q-ma-md"
          :angle="roboStore.currentcourse"
          :value="1"
          size="125px"
          :thickness="0.2"
          color="orange"
          center-color="primary"
          track-color="transparent"
        >
          {{ roboStore.currentcourse }}°
        </q-circular-progress>
      </div>
      <div class="col-2 text-center self-center">
        <q-avatar
          size="100px"
          font-size="52px"
          color="primary"
          text-color="white"
        >
          <div class="text-subtitle2">{{ roboStore.currentposition[0] }}</div>
          <div class="text-subtitle2">{{ roboStore.currentposition[1] }}</div>
        </q-avatar>
      </div>
      <div class="col-2 text-center self-center">
        <q-avatar
          size="100px"
          font-size="52px"
          color="primary"
          text-color="white"
        >
          {{ roboStore.waypoints.length }}
        </q-avatar>
      </div>
      <div class="col-2 text-center self-center">
        <q-circular-progress
          show-value
          class="text-white q-ma-md"
          :angle="roboStore.desiredcourse"
          :value="1"
          size="125px"
          :thickness="0.2"
          color="red"
          center-color="primary"
          track-color="transparent"
        >
          {{ roboStore.desiredcourse }}°
        </q-circular-progress>
      </div>
      <div class="col-2 text-center self-center">
        <q-avatar
          size="100px"
          font-size="20px"
          color="primary"
          text-color="white"
        >
          {{ roboStore.distance }}
        </q-avatar>
      </div>
      <!--div class="col-2 text-center">
        <q-badge
          class="text-h6 q-px-md"
          outline
          color="primary"
          label="State"
        />
      </div-->
      <div class="col-2 text-center">
        <q-badge
          class="text-h6 q-px-md"
          outline
          color="primary"
          label="Speed"
        />
      </div>
      <div class="col-2 text-center">
        <q-badge
          class="text-h6 q-px-md"
          outline
          color="primary"
          label="Course"
        />
      </div>
      <div class="col-2 text-center">
        <q-badge
          class="text-h6 q-px-md"
          outline
          color="primary"
          label="Position"
        />
      </div>
      <div class="col-2 text-center">
        <q-badge
          class="text-h6 q-px-md"
          outline
          color="primary"
          label="Waypoints"
        />
      </div>
      <div class="col-2 text-center">
        <q-badge
          class="text-h6 q-px-md"
          outline
          color="primary"
          label="Bearing"
        />
      </div>
      <div class="col-2 text-center">
        <q-badge
          class="text-h6 q-px-md"
          outline
          color="primary"
          label="Distance"
        />
      </div>
    </div>
  </q-card>
  <q-card flat :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
    <div class="fit row wrap">
      <div class="col-6 text-center self-center">
        <q-avatar
          size="100px"
          font-size="25px"
          color="primary"
          text-color="white"
        >
          {{ roboStore.surge }}
        </q-avatar>
      </div>
      <div class="col-6 text-center self-center">
        <q-circular-progress
          show-value
          class="text-white q-ma-md"
          :angle="roboStore.steer"
          :value="1"
          size="125px"
          :thickness="0.2"
          color="orange"
          center-color="primary"
          track-color="transparent"
        >
          {{ roboStore.steer }}°
        </q-circular-progress>
      </div>

      <div class="col-6 text-center">
        <q-badge
          class="text-h6 q-px-md"
          outline
          color="primary"
          label="Surge"
        />
      </div>
      <div class="col-6 text-center">
        <q-badge
          class="text-h6 q-px-md"
          outline
          color="primary"
          label="Steer"
        />
      </div>
    </div>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

export default {
  name: "RoboBuoyMotion",
  props: ["deviceid"],
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    return { roboStore };
  },
};
</script>
