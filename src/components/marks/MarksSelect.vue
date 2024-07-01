<template>
  <div
    v-for="(mark, index) in marks.marks"
    class="full-width row wrap justify-start items-start content-start"
    v-bind:key="index"
  >
    <div class="col-2 self-center q-pa-sm">
      <q-btn
        class="self-center"
        round
        push
        :color="mark.color"
        :label="mark.label"
        @click="marks.setSelected(mark.id)"
      />
    </div>
    <div class="col-8 self-start q-pa-sm">
      <div>lon: {{ marks.getLonFor(mark.id) }}</div>
      <div>lat: {{ marks.getLatFor(mark.id) }}</div>
    </div>
    <div class="col-2 self-center q-pa-sm">
      <q-btn
        class="self-center"
        outline
        round
        :color="mark.color"
        icon="room"
        @click="marks.setCoordinates(mark.id, gps.lat, gps.lon)"
      />
    </div>
  </div>
</template>

<script>
import { useMarks } from "src/stores/marks";
import { useGps } from "src/stores/gps";

const marks = useMarks();
const gps = useGps();

import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

export default {
  name: "MarksSelect",
  setup() {
    return {
      marks,
      gps,
    };
  },
  mounted() {
    mqttHook.registerEvent(
      "markselected",
      (topic, message) => {
        marks.selected = Number(message.toString());
      },
      "MarkSelect"
    );

    mqttHook.registerEvent(
      "marks/#",
      (topic, message) => {
        const mark = JSON.parse(message.toString());

        marks.setCoordinates(mark.id, mark.lon, mark.lat);
      },
      "MarkSet"
    );
  },
  unmounted() {
    mqttHook.unRegisterEvent("markselected", "MarkSelect");
  },
};
</script>
