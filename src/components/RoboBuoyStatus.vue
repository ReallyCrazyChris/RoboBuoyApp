<template>
  <q-card
    flat
    bordered
    class="robobuoyinfo"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <q-card-section class="row no-wrap">
      <div class="col-grow text-h6">{{ roboStore.name }}</div>
      <!--q-btn dense round class="q-ml-md" color="" icon="battery_full" />
      <q-btn dense round color="green" icon="battery_6_bar" />
      <q-btn dense round color="green" icon="battery_5_bar" /-->
      <q-btn dense round color="" icon="battery_4_bar" />
      <!--q-btn dense round color="green" icon="battery_3_bar" />
      <q-btn dense round color="warning" icon="battery_2_bar" />
      <q-btn dense round color="warning" icon="battery_1_bar" />
      <q-btn dense round color="red" icon="battery_0_bar" />
      <q-btn dense round color="pink" icon="battery_alert" /-->

      <q-btn dense round class="q-ml-md" color="" icon="gps_fixed" />
      <!--q-btn square color="primary" icon="gps_not_fixed" />
      <q-btn square color="primary" icon="gps_off" /-->

      <q-btn dense round class="q-ml-md" color="" icon="wifi" />
      <!--q-btn square color="primary" icon="wifi_2_bar" />
      <q-btn square color="primary" icon="wifi_1_bar" /-->
    </q-card-section>

    <q-separator />

    <q-card-actions class="fit row no-wrap">
      <q-btn
        v-if="!roboStore.active"
        class="q-ml-md"
        dense
        round
        color="primary"
        icon="rowing"
        @click="roboStore.active = true"
      />
      <q-btn
        v-if="roboStore.active"
        class="q-ml-md"
        dense
        round
        color="primary"
        icon="stop"
        @click="roboStore.active = false"
      />

      <q-btn class="q-ml-md" dense round color="green" icon="notifications" />
      <q-btn class="q-ml-md" dense round color="green" icon="flashlight_on" />
      <!--q-btn square color="green" icon=" flashlight_off" /-->
      <router-link
        :to="{
          name: 'robobuoysettings',
          params: { deviceid: roboStore.deviceid },
        }"
      >
        <q-btn class="q-ml-md" dense round color="amber" icon="settings"
      /></router-link>
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

export default {
  name: "RoboBuoyStatus",
  props: ["deviceid"],
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    return { roboStore };
  },
};
</script>
