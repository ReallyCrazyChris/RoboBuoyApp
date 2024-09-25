import { defineStore } from "pinia";

import { participantFactory } from "src/stores/regattaParticipant.js";

export const useRegattaParticipants = defineStore("regattaparticipants", {
  state: () => ({
    participant: participantFactory(),
    participants: [
      {
        id: "23442356",
        allow: true,
        sailnumber: "GER 2011",
        skippername: "Austin Gove",
        crewnames: "Lesiure Larry",
        clubprefix: "1WSC",
        boatclass: "29er",
        role: "sailor",
        finishtime: 0,
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
        finishtime: 0,
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
        finishtime: 0,
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
        finishtime: 0,
      },
    ],
  }),
  getters: {},
  actions: {
    addParticipant(participant) {
      // find existing participant by id
      const index = this.participants.findIndex(
        (item) => item.id === participant.id
      );

      if (index === -1) {
        // Add
        participant.allow = true;
        this.participants.push(participant);
      } else {
        // Update
        this.participants[index] = participant;
      }
    },

    removeParticipant(participant) {
      // replace or add particiant to items
      const index = this.participants.findIndex(
        (item) => item.id === participant.id
      );
      if (index > -1) {
        this.participants.splice(index, 1);
      }
    },
  },
});
