import { defineStore } from "pinia";
import { encode } from "src/networking/encode";
import { decode } from "src/networking/decode";
import { Base64 } from "js-base64";

import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

if (mqttHook.isConnected) {
  mqttHook.subscribe(["markselected", "marks/#"], 1, {}, (err, granted) => {
    console.log("subscriptions granted", granted);
  });
}

export const useMarks = defineStore("marks", {
  state: () => ({
    selected: 0,
    marks: {
      0: {
        id: 0,
        label: "1",
        lon: 0,
        lat: 0,
        color: "secondary",
      },
      1: {
        id: 1,
        label: "2",
        lon: 0,
        lat: 0,
        color: "positive",
      },
      2: {
        id: 2,
        label: "3",
        lon: 0,
        lat: 0,
        color: "warning",
      },
      3: {
        id: 3,
        label: "Start",
        lon: 0,
        lat: 0,
        color: "orange",
      },
      4: {
        id: 4,
        label: "Finish",
        lon: 0,
        lat: 0,
        color: "blue",
      },
    },
  }),

  actions: {
    getLonFor(id) {
      return this.marks[id].lon;
    },
    getLatFor(id) {
      return this.marks[id].lat;
    },

    count() {
      return Object.keys(this.marks).length;
    },

    setSelected(id) {
      this.selected = id;
      if (mqttHook.isConnected) {
        mqttHook.publish("markselected", "" + this.selected);
      }
    },

    setCoordinates(id, lon, lat) {
      this.marks[id].lon = lon;
      this.marks[id].lat = lat;

      if (mqttHook.isConnected) {
        mqttHook.publish(
          "marks/" + id,
          JSON.stringify({
            id: id,
            lon: this.marks[id].lon,
            lat: this.marks[id].lat,
          })
        );
      }
    },
  },
});
