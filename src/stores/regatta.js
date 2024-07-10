import { defineStore } from "pinia";
import { useMQTT } from "mqtt-vue-hook";

const mqttHook = useMQTT();

export const useRegatta = defineStore("regatta", {
  state: () => ({
    id: "1097",
    Title: "ZombieBieber",
    lon: null,
    lat: null,
    earliestStart: null,
    latestStart: null,
    boats: [
      { id: "asbe", sailnumber: "1234", crewlist: "", role: "committee" },
    ],
    races: [{ id: 0, class: "29er", startTime: 0, endTime: 0, results: [] }],
  }),

  actions: {
    submitBoat(sailnumber, crewlist) {
      this.boats.append({
        id: "assd",
        sailnumber: "" + sailnumber,
        crewlist: "" + crewlist,
        role: null,
      });
    },

    deleteBoat(id) {},

    submitRace(race) {
      this.boats.append(race);
    },

    deleteRace(id) {},
  },
});
