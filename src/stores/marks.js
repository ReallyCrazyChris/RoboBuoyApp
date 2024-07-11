import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";

const marksStoreDefinition = defineStore("marks", {
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
    },
  }),

  actions: {
    getLon() {
      return this.marks[this.selected].lon;
    },

    getLat() {
      return this.marks[this.selected].lat;
    },

    count() {
      return Object.keys(this.marks).length;
    },

    setSelected(id) {
      this.selected = id;
      if (mqttHook.isConnected) {
        mqttHook.publish("marks", JSON.stringify(this.$state));
      }
    },

    setCoordinates(id, lon, lat) {
      this.marks[id].lon = lon;
      this.marks[id].lat = lat;

      if (mqttHook.isConnected) {
        mqttHook.publish("marks", JSON.stringify(this.$state));
      }
    },
  },
});

// Singleton
const useMarksStore = marksStoreDefinition();

const mqttHook = useMQTT();

if (mqttHook.isConnected) {
  mqttHook.subscribe(["marks"], 1, { nl: true }, (err, granted) => {
    console.log("subscriptions granted", granted);
  });
}

mqttHook.registerEvent(
  "marks",
  (topic, message) => {
    useMarksStore.$patch(JSON.parse(message.toString()));
    console.log(useMarksStore.$state);
  },
  "vmcMarksRegistration"
);

// singleton
export const useMarks = () => {
  return useMarksStore;
};
