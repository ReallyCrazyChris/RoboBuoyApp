import { defineStore } from "pinia";

import { useRegattaResults } from "src/stores/regattaResults";

export const useRaceParticipants = defineStore("raceparticipants", {
  state: () => ({
    filter: "",
    position: 1,
    items: [],
  }),
  getters: {
    racing({ items }) {
      return items.filter((participant) => participant.finishtime == undefined);
    },

    finished({ items }) {
      return items
        .filter((participant) => participant.finishtime > 0)
        .sort((a, b) => a.points - b.points);
    },
  },
  actions: {
    add(participants) {
      console.log(participants);
      this.filter = "";
      this.position = 1;
      this.items = JSON.parse(JSON.stringify(participants.items));
    },

    finish(participant_finished) {
      const item = this.items.find(
        (participant) => participant.id == participant_finished.id
      );
      item.finishtime = Date.now();
      item.position = this.position++;

      if (item.position == 1) {
        item.points = 0.7;
      } else {
        item.points = item.position;
      }
    },

    ocs(participant_finished) {
      const item = this.items.find(
        (participant) => participant.id == participant_finished.id
      );
      item.finishtime = Date.now();
      item.points = this.items.length;
      item.position = "OCS";
    },

    dnf(participant_finished) {
      const item = this.items.find(
        (participant) => participant.id == participant_finished.id
      );
      item.finishtime = Date.now();
      item.points = this.items.length;
      item.position = "DNF";
    },

    commit() {
      const regattareuslts = useRegattaResults();
      regattareuslts.add(JSON.parse(JSON.stringify(this.$state)));
    },
  },
});
