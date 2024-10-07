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

export function raceFactory() {
  return {
    id: `${Math.random().toString(16).substring(2, 10)}`,
    starttime: null,
    racenumber: 0,
    results: [],
  };
}

export function resultFactory(participant) {
  return {
    id: participant.id,
    sailprefix: participant.sailprefix,
    sailnumber: participant.sailnumber,
    skippername: participant.skippername,
    crewnames: participant.crewnames,
    clubprefix: participant.clubprefix,
    boatclass: participant.boatclass,
    role: participant.role,
    allow: participant.allow,
    starttime: Date.now(),
    finishtime: null,
    finished: false,
    ocs: false,
    dnf: false,
  };
}

export const useRegattaEvent = defineStore("regattaevent", {
  state: () => ({
    filter: "",
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
    races: [],
    currentrace: raceFactory(),
  }),
  getters: {
    currentraceParticipants({ currentrace }) {
      // participants currently racing
      return currentrace.results.filter((result) => {
        return !!!result.finishtime;
      });
    },

    currentraceResults({ currentrace }) {
      // participants sucessfully finished racing
      const racingFinished = currentrace.results
        .filter((result) => {
          if (result.ocs || result.dnf) {
            return false;
          }
          return !!result.finishtime;
        })
        .sort(
          (a, b) =>
            a.finishtime -
            currentrace.starttime -
            (b.finishtime - currentrace.starttime)
        )
        .map((result, index) => {
          result.position = result.position || index + 1;
          result.points = index + 1;
          return result;
        });

      // participants with unsucessfull racing
      const racingErrors = currentrace.results
        .filter((result) => {
          if (result.ocs || result.dnf) {
            return true;
          }
        })
        .sort(
          (a, b) =>
            a.finishtime -
            currentrace.starttime -
            (b.finishtime - currentrace.starttime)
        )
        .map((result, index) => {
          if (result.ocs) {
            result.position = "OCS";
            result.points = currentrace.results.length;
          }

          if (result.dnf) {
            result.position = "DNF";
            result.points = currentrace.results.length;
          }
          return result;
        });

      return [...racingFinished, ...racingErrors];
    },

    overallraceResults({ participants, races }) {
      return participants
        .map((participant, index) => {
          //var participant = JSON.parse(JSON.stringify(_participant));
          var totalpoints = 0;

          this.races.forEach((race, index) => {
            const result = race.results.find(
              (competitor) => competitor.id == participant.id
            );

            if (result && result.points) {
              participant["race" + race.racenumber] = result.points;
              totalpoints = result.points + (totalpoints || 0);
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

    overallraceResultsColumns({ races }) {
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
  },
  actions: {
    // Participant

    publishJoinRegatta() {
      if (mqttHook.isConnected) {
        console.log("publishJoinRegatta", JSON.stringify(this.participant));
        mqttHook.publish("joinregatta", JSON.stringify(this.participant));
      }
    },

    joinRegatta(participant) {
      this.addParticipant(participant);
    },

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

    resetParticipant(previousParticipant) {
      this.participant = participantFactory({
        clubprefix: previousParticipant?.clubprefix || "",
        boatclass: previousParticipant?.boatclass || "",
        role: previousParticipant?.role || "sailor",
      });
    },

    //RACE
    addRace() {
      const raceresults = this.participants
        .filter((participant) => participant.allow == true)
        .map((participant) => {
          return resultFactory(participant);
        });

      const race = raceFactory();
      race.racenumber = this.races.length + 1;
      race.results = raceresults;
      this.currentrace = race;
    },

    raceFinish(participantid) {
      const participantResult = this.currentrace.results.find((participant) => {
        return participantid === participant.id;
      });

      if (participantResult) {
        participantResult.finishtime = Date.now();
        participantResult.finished = true;
      }
    },

    raceOCS(participantid) {
      const participantResult = this.currentrace.results.find((participant) => {
        return participantid === participant.id;
      });

      if (participantResult) {
        participantResult.finishtime = Date.now();
        participantResult.ocs = true;
      }
    },

    raceDNF(participantid) {
      const participantResult = this.currentrace.results.find((participant) => {
        return participantid === participant.id;
      });

      if (participantResult) {
        participantResult.finishtime = Date.now();
        participantResult.dnf = true;
      }
    },

    commitRaceResult() {
      const racexists = this.races.find((race) => {
        return this.currentrace.id === race.id;
      });

      if (!racexists) {
        this.races.push(this.currentrace);
      }

      //this.addRace();
    },
  },
});
