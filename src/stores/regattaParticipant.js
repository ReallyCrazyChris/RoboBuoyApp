import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

export const useRegattaParticipant = defineStore("regattaparticipant", {
  state: () => ({
    id: null,
    sailnumber: "",
    skippername: "",
    crewnames: "",
    clubprefix: "",
    boatclass: "",
    role: "sailor",
  }),
  getters: {},
  actions: {
    save() {
      if (!this.id) {
        this.id = `${Math.random().toString(16).substring(2, 10)}`;
      }

      this.publishAddRegattaParticipant();
    },

    publishAddRegattaParticipant() {
      if (mqttHook.isConnected) {
        const regattaParticipantJSON = JSON.stringify({
          id: this.id,
          sailnumber: this.sailnumber,
          skippername: this.skippername,
          crewnames: this.crewnames,
          clubprefix: this.clubprefix,
          boatclass: this.boatclass,
          role: this.role,
        });
        mqttHook.publish("addregattaparticipant", regattaParticipantJSON, 0, {
          retain: false,
        });
      }
    },
  },
});
