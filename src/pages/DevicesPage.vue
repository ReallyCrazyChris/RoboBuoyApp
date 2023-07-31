<template>
  <q-page class="flex flex-center">
    <RoboBuoyInfo
      v-for="device in devicesStore.devices"
      :key="device.id"
      :deviceid="device.id"
    ></RoboBuoyInfo>

    <q-page-sticky position="bottom-right" :offset="[22, 22]">
      <q-btn fab icon="add" color="accent" @click="$bluetooth.pair()" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useDevicesStore } from "stores/devicesStore";
import RoboBuoyInfo from "components/RoboBuoyInfo.vue";

export default defineComponent({
  name: "DevicesPage",

  components: {
    RoboBuoyInfo,
  },

  setup() {
    const devicesStore = useDevicesStore();

    return {
      devicesStore,
    };
  },
});
</script>
