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
          <div class="text-h6">Alpha</div>
          <div class="text-caption">
            to what persentage are the respective course values trusted
          </div>
        </div>
      </div>
      <div class="fit row q-pa-md">
        <q-badge class="col-2 q-mr-md" color="teal"> GPS Alpha </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.gpsalpha"
          @update:model-value="roboStore.setgpsalpha"
          :min="0"
          :max="1"
          :step="0.01"
          label
          label-always
          color="teal"
        ></q-slider>
      </div>
      <div class="fit row q-pa-md">
        <q-badge class="col-2 q-mr-md" color="green"> Compass Alpha </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.magalpha"
          @update:model-value="roboStore.setmagalpha"
          :min="0"
          :max="1"
          :step="0.01"
          label
          label-always
          color="green"
        ></q-slider>
      </div>
      <div class="fit row q-pa-md">
        <q-badge class="col-2 q-mr-md" color="light-green">
          Declination Alpha
        </q-badge>
        <q-slider
          class="col-grow"
          :model-value="roboStore.declinationalpha"
          @update:model-value="roboStore.setdeclinationalpha"
          :min="0"
          :max="1"
          :step="0.01"
          label
          label-always
          color="light-green"
        ></q-slider>
      </div>
      <q-card-actions>
        <q-btn flat @click="roboStore.getAlphasettings()">read</q-btn>
        <q-btn flat @click="roboStore.savesettings()">Save</q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { useRoboStore } from "stores/roboStore";

export default {
  name: "AlphaSettings",
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
