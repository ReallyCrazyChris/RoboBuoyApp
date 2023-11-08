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
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="indigo">
          Maximum thrust (cm/s)
        </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.vmax"
          @update:model-value="this.roboStore.setvmax"
          :min="0"
          :max="100"
          :step="1"
          label
          label-always
          switch-label-side
          color="indigo"
        ></q-slider>
      </div>
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="deep-purple">
          Steering sensetivity (gain)</q-badge
        >
        <q-slider
          class="col-grow"
          :model-value="roboStore.steergain"
          @update:model-value="roboStore.setsteergain"
          :min="1"
          :max="200"
          :step="1"
          label
          label-always
          switch-label-side
          color="deep-purple"
        />
      </div>
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="purple">
          Left Minimum PWM to rotate</q-badge
        >
        <q-slider
          class="col-grow"
          :model-value="roboStore.mpl"
          @update:model-value="roboStore.setmpl"
          :min="1"
          :max="80"
          :step="1"
          label
          label-always
          switch-label-side
          color="purple"
        />
      </div>
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="purple">
          Right Minimum PWM to rotate</q-badge
        >
        <q-slider
          class="col-grow"
          :model-value="roboStore.mpr"
          @update:model-value="roboStore.setmpr"
          :min="1"
          :max="80"
          :step="1"
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
