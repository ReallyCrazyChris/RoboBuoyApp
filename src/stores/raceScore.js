import { create } from "ol/transform";
import { defineStore } from "pinia";

import { useRegattaParticipants } from "./regattaParticipants";
const regattaparticipants = useRegattaParticipants();

import { useRegattaResults } from "src/stores/regattaResults";
const regattaresults = useRegattaResults();

export const useRaceScore = defineStore("racescore", {
  state: () => ({
    id: `${Math.random().toString(16).substring(2, 10)}`,
    racenumber: 1,
    starttime: Date.now(),
    participants: [],
  }),
  getters: {
    racing() {
      return this.participants.filter(
        (participant) => !!!participant.position && participant.allow
      );
    },

    success({ participants }) {
      return (
        participants
          .filter(
            (participant) => participant.finishtime > 0 && participant.allow
          )
          .sort(
            (a, b) =>
              a.finishtime - this.starttime - (b.finishtime - this.starttime)
          )
          .map((participant, index) => {
            participant.starttime = this.starttime;
            participant.position = participant.position || index + 1;
            return participant;
          }) || []
      );
    },

    fail({ participants }) {
      return (
        participants.filter((participant) =>
          ["OCS", "DNF"].includes(participant.position)
        ) || []
      );
    },

    result() {
      return [...this.success, ...this.fail];
    },
  },
  actions: {
    create() {
      this.id = `${Math.random().toString(16).substring(2, 10)}`;
      this.racenumber = regattaresults.racenumber;
      this.starttime = Date.now();
      //this.participants = regattaparticipants.participants;
      this.participants = JSON.parse(
        JSON.stringify(regattaparticipants.participants)
      );
    },

    finish(participant_finished) {
      const participant = this.participants.find(
        (participant) => participant.id == participant_finished.id
      );
      participant.finishtime = Date.now();
    },

    ocs(participant_finished) {
      const participant = this.participants.find(
        (participant) => participant.id == participant_finished.id
      );

      participant.position = "OCS";
    },

    dnf(participant_finished) {
      const participant = this.participants.find(
        (participant) => participant.id == participant_finished.id
      );

      participant.position = "DNF";
    },

    commitRaceResult() {
      if (!!!regattaresults.races.includes(this.result)) {
        regattaresults.commitRaceResult(this.result);
      }
    },
  },
});
