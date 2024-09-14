import { defineStore } from "pinia";
import { useRaceParticipants } from "src/stores/raceParticipants";

export const useRegattaParticipants = defineStore("regattaparticipants", {
  state: () => ({
    filter: "",
    items: [
      {
        id: "23442356",
        allow: true,
        sailnumber: "GER 2011",
        skippername: "Austin Gove",
        crewnames: "Lesiure Larry",
        clubprefix: "1WSC",
        boatclass: "29er",
        role: "sailor",
      },
      {
        id: "543982769",
        allow: true,
        sailnumber: "USA 1036",
        skippername: "James Ashton",
        crewnames: "Anita Bosun",
        clubprefix: "1WSC",
        boatclass: "29er",
        role: "sailor",
      },
      {
        id: "548980769",
        allow: true,
        sailnumber: "USA 3036",
        skippername: "Carol Ashton",
        crewnames: "David Bosun",
        clubprefix: "1WSC",
        boatclass: "29er",
        role: "sailor",
      },
      {
        id: "543980769",
        allow: true,
        sailnumber: "USA 4036",
        skippername: "Patrick Ashton",
        crewnames: "John Bosun",
        clubprefix: "1WSC",
        boatclass: "29er",
        role: "sailor",
      },
    ],
  }),
  getters: {},
  actions: {
    getById(id) {
      const index = this.items.findIndex((item) => item.id === id);
      if (index > -1) {
        return this.items[index];
      }
      return null;
    },

    add(participant) {
      // replace or add particiant to items
      const index = this.items.findIndex((item) => item.id === participant.id);
      if (index === -1) {
        participant.allow = true;
        this.items.push(participant);
      } else {
        this.items[index] = participant;
      }
    },

    remove(participant) {
      // replace or add particiant to items
      const index = this.items.findIndex((item) => item.id === participant.id);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    },

    createRaceParticipants() {
      // transfers allowed regatta participants to a race participants

      const raceparticipants = useRaceParticipants();
      raceparticipants.clear();

      this.items.forEach((item) => {
        if (item.allow) {
          raceparticipants.items.push(Object.assign({}, item));
        }
      });
    },
  },
});
