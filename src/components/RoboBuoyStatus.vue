<template>
  <q-card
    flat
    bordered
    class="robobuoyinfo"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <q-card-section
      class="fit row no-wrap justify-evenly items-center content-center"
    >
      <div class="q-ml-md text-h5">{{ roboStore.name }}</div>

      <!--q-btn dense round class="q-ml-md" color="" icon="battery_full" />
      <q-btn dense round color="green" icon="battery_6_bar" />
      <q-btn dense round color="green" icon="battery_5_bar" /-->
      <q-btn dense round class="q-ml-md" color="green" icon="battery_4_bar">
        <q-tooltip class="bg-dark" color="green"
          >battery 60%, 4 hours</q-tooltip
        >
      </q-btn>
      <!--q-btn dense round color="green" icon="battery_3_bar" />
      <q-btn dense round color="warning" icon="battery_2_bar" />
      <q-btn dense round color="warning" icon="battery_1_bar" />
      <q-btn dense round color="red" icon="battery_0_bar" />
      <q-btn dense round color="pink" icon="battery_alert" /-->

      <q-btn
        v-if="roboStore.positionvalid"
        dense
        round
        class="q-ml-md"
        color="green"
        icon="gps_fixed"
        ><q-tooltip class="bg-dark" color="green">gps locked</q-tooltip></q-btn
      >
      <q-btn
        v-else
        dense
        round
        class="q-ml-md"
        color="red"
        icon="gps_not_fixed"
      >
        <q-tooltip class="bg-dark" color="green">no gps lock</q-tooltip>
      </q-btn>

      <q-btn dense round class="q-ml-md" color="" icon="wifi">
        <q-tooltip class="bg-dark" color="green"
          >signal good
          {{ devicesStore.activedevicebyId(roboStore.id).localrssi }}</q-tooltip
        >
      </q-btn>
      <!--q-btn square color="primary" icon="wifi_2_bar" />
      <q-btn square color="primary" icon="wifi_1_bar" /-->
    </q-card-section>

    <q-separator />

    <q-card-actions
      class="fit row no-wrap justify-evenly items-center content-center"
    >
      <q-btn
        v-if="!roboStore.underway"
        class="q-ml-md"
        dense
        round
        color="primary"
        icon="play_circle"
        @click="roboStore.underway = true"
        ><q-tooltip class="bg-dark">underway</q-tooltip></q-btn
      >
      <q-btn
        v-if="roboStore.underway"
        class="q-ml-md"
        dense
        round
        color="primary"
        icon="stop"
        @click="roboStore.underway = false"
        ><q-tooltip class="bg-dark">hold position</q-tooltip></q-btn
      >

      <q-btn class="q-ml-md" dense round color="primary" icon="notifications"
        ><q-tooltip class="bg-dark">signal tone</q-tooltip></q-btn
      >
      <q-btn class="q-ml-md" dense round color="primary" icon="flashlight_on"
        ><q-tooltip class="bg-dark">signal light</q-tooltip></q-btn
      >

      <router-link
        :to="{
          name: 'robobuoysettings',
          params: { deviceid: roboStore.deviceid },
        }"
      >
        <q-btn class="q-ml-md" dense round color="dark" icon="settings"
          ><q-tooltip class="bg-dark">settings</q-tooltip></q-btn
        ></router-link
      >
      <!--q-btn
        @click="$bluetooth.disconnect(roboStore.device)"
        square
        color="red"
        icon="delete"
      /-->
    </q-card-actions>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";
import { useDevicesStore } from "stores/devicesStore";

export default {
  name: "RoboBuoyStatus",
  props: ["deviceid"],
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    const devicesStore = useDevicesStore();
    return { roboStore, devicesStore };
  },
};
</script>
