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
          <div class="text-h6">Hold Settings PID</div>
          <div class="text-caption"></div>
        </div>
      </div>
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="pink">
          Waypoint arrived radius (m)
        </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.waypointarrivedradius"
          @update:model-value="roboStore.setwaypointarrivedradius"
          :min="0"
          :max="10"
          :step="0.1"
          label
          label-always
          switch-label-side
          color="pink"
        ></q-slider>
      </div>
      <div class="fit q-pa-md">
        <q-badge class="q-mr-md" color="deep-orange"> Hold gain </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.holdgain"
          @update:model-value="roboStore.setholdgain"
          :min="0"
          :max="5"
          :step="0.1"
          label
          label-always
          switch-label-side
          color="deep-orange"
        ></q-slider>
      </div>

      <q-card-actions>
        <q-btn size="sm" @click="roboStore.getHoldsettings()">read</q-btn>
        <q-btn size="sm" @click="roboStore.savesettings()">Save</q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

export default {
  name: "HoldSettings",
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
