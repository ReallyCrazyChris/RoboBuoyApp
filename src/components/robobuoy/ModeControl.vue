<template>
  <q-btn-group push glossy>
    <q-btn
      v-if="roboStore.isAuto"
      label="Auto"
      :icon="roboStore.autoIcon"
      color="primary"
      size="sm"
    />
    <q-btn
      v-else
      label="Auto"
      :icon="roboStore.autoIcon"
      size="sm"
      @click="roboStore.setmode('auto')"
    />

    <q-btn
      v-if="roboStore.isStopped"
      label=""
      icon="stop"
      color="red"
      size="sm"
    />
    <q-btn
      v-else
      label=""
      icon="stop"
      size="sm"
      @click="roboStore.setmode('stop')"
    />

    <q-btn
      v-if="roboStore.isManual"
      label="Manual"
      icon="swipe"
      color="green"
      size="sm"
    />
    <q-btn
      v-else
      label="Manual"
      icon="swipe"
      size="sm"
      @click="roboStore.setmode('manual')"
    />
  </q-btn-group>
</template>

<script>
import { useRoboStore } from "stores/roboStore";
export default {
  name: "ManualControl",
  props: ["deviceid"],
  components: {},
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    return {
      roboStore,
    };
  },
};
</script>
