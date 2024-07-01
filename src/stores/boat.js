import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";

const mqttHook = useMQTT();

export const useBoat = defineStore("boat", {
  state: () => ({
    id: 1234,
    sailnumber: null,
    crewlist: null,
  }),

  persist: true,

  actions: {
    submit() {
      if (mqttHook.isConnected) {
        mqttHook.publish(
          "boat/" + this.id,
          JSON.stringify({
            id: this.id,
            sailnumber: this.sailnumber,
            crewlist: this.crewlist,
            type: this.type,
          })
        );
      }
    },
  },
});
