import { defineStore } from "pinia";

import { useRegattaParticipants } from "./regattaEvent";

export const useRegattaResults = defineStore("regattaresults", {
  state: () => ({
    filter: "",
    races: [],
  }),
  getters: {
    racenumber({ races }) {
      return races.length + 1;
    },

    columns({ races }) {
      const tableColumns = [
        {
          name: "position",
          align: "left",
          label: "Place",
          field: "position",
          sortable: true,
        },

        {
          name: "sailnumber",
          align: "left",
          label: "Sail",
          field: "sailnumber",
          sortable: true,
        },
        {
          name: "skippername",
          align: "left",
          label: "Skipper",
          field: "skippername",
          sortable: true,
        },

        {
          name: "crewnames",
          align: "left",
          label: "Crew",
          field: "crewnames",
        },
      ];

      this.races.forEach((race, index) => {
        tableColumns.push({
          name: "race" + (1 + index),
          align: "left",
          label: "Race " + (1 + index),
          field: "race" + (1 + index),
          sortable: true,
        });
      });

      tableColumns.push({
        name: "totalpoints",
        align: "right",
        label: "Total Points",
        field: "totalpoints",
        sortable: true,
      });

      return tableColumns;
    },

    raceScore({ races }) {
      races.map((race, raceindex) => {
        const maxpoints = race.length + 1;

        race.map((participant, index) => {
          if (participant.position == "DNF") {
            participant.points = maxpoints;
            return participant;
          }

          if (participant.position == "OCS") {
            participant.points = maxpoints;
            return participant;
          }

          participant.points = participant.position;
        });
      }) || [];

      return races;
    },

    particiantScore({ races }) {
      const participants = useRegattaParticipants().participants;

      return participants
        .map((_participant, index) => {
          const participant = JSON.parse(JSON.stringify(_participant));

          var totalpoints = NaN;

          races.forEach((raceresult, index) => {
            const raceparticipant = raceresult.find(
              (raceparticipant) => raceparticipant.id == participant.id
            );

            if (raceparticipant && raceparticipant.points) {
              participant["race" + (1 + index)] = raceparticipant.points;
              totalpoints = raceparticipant.points + (totalpoints || 0);
            }
          });

          participant.totalpoints = totalpoints;

          return participant;
        })
        .sort((a, b) => a.totalpoints - b.totalpoints)
        .map((particiant, index) => {
          particiant.position = index + 1;
          return particiant;
        });
    },

    _particiantScore({ races }) {
      const participants = JSON.parse(
        JSON.stringify(useRegattaParticipants().participants)
      );

      participants.forEach((participant) => {
        var totalpoints = NaN;

        races.forEach((raceresult, index) => {
          const raceparticipant = raceresult.find(
            (raceparticipant) => raceparticipant.id == participant.id
          );

          participant["race" + (1 + index)] = raceparticipant.points;

          if (raceparticipant.points) {
            totalpoints = raceparticipant.points + (totalpoints || 0);
          }
        });

        participant.totalpoints = totalpoints;
      });

      participants
        .sort((a, b) => a.totalpoints - b.totalpoints)
        .forEach((particiant, index) => {
          particiant.position = index + 1;
        });

      return participants || [];
    },
  },
  actions: {
    commitRaceResult(raceresult) {
      this.races.push(raceresult);
    },
  },
});
