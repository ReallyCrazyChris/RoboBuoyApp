<template>
  <q-page ref="RoboBuoyPositions">
    <RoboBuoyMap />
    <q-drawer
      side="right"
      show-if-above
      bordered
      :width="300"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <RoboBuoyStatus
          v-for="device in devicesStore.connecteddevices"
          :key="device.id"
          :deviceid="device.id"
          class="q-pa-xs"
        />
      </q-scroll-area>
      <q-page-sticky position="bottom-right" :offset="[-180, 22]">
        <q-btn
          v-if="devicesStore.devicecount() == 0"
          class="blinking"
          fab
          icon="add"
          color="primary"
          @click="$bluetooth.pair()"
        >
          <q-tooltip class="bg-brimary">Pair Robobuoy</q-tooltip>
        </q-btn>
        <q-btn v-else fab icon="add" color="primary" @click="$bluetooth.pair()">
          <q-tooltip class="bg-brimary">Pair Robobuoy</q-tooltip>
        </q-btn>
      </q-page-sticky>
    </q-drawer>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useDevicesStore } from "stores/devicesStore";
import RoboBuoyStatus from "components/RoboBuoyStatus.vue";
import RoboBuoyMap from "src/components/map/RoboBuoyMap.vue";

export default defineComponent({
  name: "RoboBuoyPositions",
  components: {
    RoboBuoyStatus,
    RoboBuoyMap,
  },
  setup() {
    const devicesStore = useDevicesStore();
    return {
      devicesStore,
    };
  },
});
</script>

<style>
@keyframes fade {
  from {
    opacity: 0.5;
  }
}

.blinking {
  animation: fade 0.7s infinite alternate;
}
</style>
