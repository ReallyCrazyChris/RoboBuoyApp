import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

export const useParticipant = defineStore("participant", {
  persist: true,

  state: () => ({
    id: "",
    crewnames: "",
    sailnumber: "",
  }),

  actions: {
    createParticipantId() {
      this.id = `${Math.random().toString(16).substring(2, 10)}`;
    },

    publishParticipantState() {
      if (mqttHook.isConnected) {
        mqttHook.publish(
          "participant",
          JSON.stringify({
            id: this.id,
            crewnames: this.crewnames,
            sailnumber: this.sailnumber,
          }),
          0,
          { retain: true }
        );
      }
    },

    reset() {
      this.crewnames = "";
      this.sailnumber = "";
    },
  },
});
