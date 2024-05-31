import { defineStore } from "pinia";

export const useMarkCollection = defineStore("markCollection", {
  state: () => ({
    nextmark: {
      id: 3,
      label: "Mark 4",
      coordinate: [10.832274248052466, 49.70878107952494],
    },
    markcollection: {
      0: {
        id: 0,
        label: "Mark 1",
        coordinate: [10.832274248052466, 49.70878107952494],
      },
      1: {
        id: 1,
        label: "Mark 2",
        coordinate: [10.832274248052466, 49.70878107952494],
      },
      2: {
        id: 2,
        label: "Mark 3",
        coordinate: [10.832274248052466, 49.70878107952494],
      },
      3: {
        id: 3,
        label: "Mark 4",
        coordinate: [10.832274248052466, 49.70878107952494],
      },
    },
  }),

  getters: {
    selected(state) {
      return state.nextmark.id;
    },

    options(state) {
      const options = Object.values(state.markcollection).map(function (mark) {
        return { value: mark.id, label: mark.label };
      });
      return options;
    },
  },

  actions: {
    count() {
      return Object.keys(this.markcollection).length;
    },
    byId(markid) {
      return this.markcollection[markid];
    },
    add(mark) {
      mark.id = Object.keys(this.markcollection).length;
      this.markcollection[mark.id] = mark;
    },
    remove(id) {
      delete this.markcollection[id];
    },
    selectMark(id) {
      console.log(this.markcollection[id], id);
      this.nextmark = this.markcollection[id];
    },
  },
});
