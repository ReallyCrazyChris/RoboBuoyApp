import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

export const useRegatta = defineStore("regatta", {
  state: () => ({
    id: "",
    name: "Quick Regatta",
    description: "Come join us for a quick regatta",
    date: "",
    startTime: "",
    endTime: "",
  }),

  actions: {
    createRegattaId() {
      this.id = `${Math.random().toString(16).substring(2, 10)}`;
    },

    publishRegattaState() {
      if (mqttHook.isConnected) {
        mqttHook.publish(
          "regatta",
          JSON.stringify({
            id: this.id,
            title: this.title,
            description: this.description,
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
          }),
          0,
          { retain: true }
        );
      }
    },

    reset() {
      var endTime = new Date();
      endTime.setTime(endTime.getTime() + 1 * 60 * 60 * 1000);

      this.title = "Quick Regatta";
      this.description = "Join us on the water for a quick regatta";
      this.date = new Date().toISOString().slice(0, 16);
      this.startTime = new Date().toLocaleTimeString().substring(0, 5);
      this.endTime = endTime.toLocaleTimeString().substring(0, 5);
    },
  },
});
