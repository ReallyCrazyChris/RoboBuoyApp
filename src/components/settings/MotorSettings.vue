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
          <div class="text-h6">Motor</div>
          <div class="text-caption">
            set the maximum thrust, steering sensitivity and the pwm where the
            motors being to rotate
          </div>
        </div>
      </div>
      <!--div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="red"> Steer Gain </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.steergain"
          @update:model-value="this.roboStore.setsteergain"
          :min="0"
          :max="100"
          :step="1"
          label
          label-always
          switch-label-side
          color="red"
        ></q-slider>
      </div-->
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="indigo">
          Maximum PWM to rotate
        </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.maxpwm"
          @update:model-value="roboStore.setmaxpwm"
          :min="3000"
          :max="7000"
          :step="100"
          label
          label-always
          switch-label-side
          color="indigo"
        ></q-slider>
      </div>

      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="purple">
          Left: minimum PWM for rotation</q-badge
        >
        <q-slider
          class="col-grow"
          :model-value="roboStore.minPwmLeft"
          @update:model-value="roboStore.setminpwmleft"
          :min="3000"
          :max="4600"
          :step="50"
          label
          label-always
          switch-label-side
          color="purple"
        />
      </div>
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="purple">
          Right: minimum PWM for rotation</q-badge
        >
        <q-slider
          class="col-grow"
          :model-value="roboStore.minPwmRight"
          @update:model-value="roboStore.setminpwmright"
          :min="3000"
          :max="4600"
          :step="50"
          label
          label-always
          switch-label-side
          color="purple"
        />
      </div>
      <q-card-actions>
        <q-btn size="sm" @click="roboStore.getMotorsettings()">read</q-btn>
        <q-btn size="sm" @click="roboStore.savesettings()">Save</q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

export default {
  name: "MotorSettings",
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
