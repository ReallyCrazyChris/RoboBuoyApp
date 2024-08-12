<template>
  <q-page>
    <RobobuoyStatus
      v-for="device in devicesStore.connecteddevices"
      :key="device.id"
      :deviceid="device.id"
      class="q-pa-xs"
    />

    <q-page-sticky position="bottom">
      <q-btn fab icon="add" color="primary" @click="$bluetooth.pair()">
        <q-tooltip class="bg-brimary">Pair Robobuoy</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useDevicesStore } from "stores/devicesStore";
import RobobuoyStatus from "components/robobuoy/RobobuoyStatus.vue";

export default defineComponent({
  name: "RobotBuoys",
  components: {
    RobobuoyStatus,
  },
  setup() {
    const devicesStore = useDevicesStore();
    return {
      devicesStore,
    };
  },
});
</script>
