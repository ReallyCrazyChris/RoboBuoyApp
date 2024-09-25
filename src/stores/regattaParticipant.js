import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

export function participantFactory(params) {
  return {
    id: params?.id || `${Math.random().toString(16).substring(2, 10)}`,
    sailprefix: params?.sailprefix || "",
    sailnumber: params?.sailnumber || "",
    skippername: params?.skippername || "",
    crewnames: params?.crewnames || "",
    clubprefix: params?.clubprefix || "",
    boatclass: params?.boatclass || "",
    role: params?.role || "sailor",
    allow: params?.allow || true,
  };
}

export const useRegattaParticipant = defineStore("regattaparticipant", {
  state: () => participantFactory(),
  getters: {},
  actions: {
    reset(previousParticipant) {
      this.$state = participantFactory({
        clubprefix: previousParticipant?.clubprefix || "",
        boatclass: previousParticipant?.boatclass || "",
        role: previousParticipant?.role || "sailor",
      });
    },

    joinRegatta() {
      if (mqttHook.isConnected) {
        mqttHook.publish(
          "addregattaparticipant",
          JSON.stringify(this.$state),
          0,
          {
            retain: false,
          }
        );
      }
    },
  },
});
