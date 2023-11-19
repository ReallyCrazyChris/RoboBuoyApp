<template>
  <q-card
    flat
    bordered
    class="q-my-md"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <q-card-section>
      <div class="q-pa-md row items-center no-wrap">
        <div class="col">
          <div class="text-h6">Steering PID</div>
          <div class="text-caption">
            Tune the PID controller for maximum capability
          </div>
        </div>
      </div>
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="orange">
          Kp - proportional gain
        </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.Kp"
          @update:model-value="roboStore.setKp"
          :min="0"
          :max="100"
          :step="1"
          label
          label-always
          switch-label-side
          color="orange"
        ></q-slider>
      </div>
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="deep-orange">
          Ki - integral gain
        </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.Ki"
          @update:model-value="roboStore.setKi"
          :min="0"
          :max="50"
          :step="0.1"
          label
          label-always
          switch-label-side
          color="deep-orange"
        ></q-slider>
      </div>
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="brown">
          Kd - differential gain
        </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.Kd"
          @update:model-value="roboStore.setKd"
          :min="0"
          :max="100"
          :step="1"
          label
          label-always
          switch-label-side
          color="brown"
        ></q-slider>
      </div>

      <q-card-actions>
        <q-btn size="sm" @click="roboStore.getPIDsettings()">read</q-btn>
        <q-btn size="sm" @click="roboStore.savesettings()">Save</q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

export default {
  name: "PIDSettings",
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
