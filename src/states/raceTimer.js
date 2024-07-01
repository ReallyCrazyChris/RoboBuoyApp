import { createMachine, fromCallback, sendTo, assign } from "xstate";
export const machine = createMachine(
  {
    context: {
      endTime: 0,
      raceTime: 0,
      startTime: 0,
    },
    initial: "raceinfo",
    id: "RegattaRaceSequence",
    invoke: {
      input: {},
      src: "sequenceTimer",
      id: "sequenceTimer",
    },

    states: {
      raceinfo: {
        entry: [
          {
            type: "clearRaceTime",
          },
          {
            type: "assignRaceTime",
          },
        ],
        on: {
          startsequence: [
            {
              target: "class",
              actions: [
                {
                  type: "startSequenceTimer",
                },
              ],
              meta: {},
            },
          ],
          postpone: [
            {
              target: "racepostponed",
              actions: [],
            },
          ],
        },
      },
      class: {
        on: {
          prepare: [
            {
              target: "prepare",
              actions: [],
            },
          ],
          postpone: [
            {
              target: "racepostponed",
              actions: [],
            },
          ],
          assignRaceTime: [
            {
              target: "class",
              actions: [
                {
                  type: "assignRaceTime",
                },
              ],
            },
          ],
        },
      },
      racepostponed: {
        entry: {
          type: "stopSequenceTimer",
        },
        on: {
          raceinfo: [
            {
              target: "raceinfo",
              actions: [],
            },
          ],
          ashore: [
            {
              target: "racepostponed_ashore",
              actions: [],
            },
          ],
          today: [
            {
              target: "racepostponed_today",
              actions: [],
            },
          ],
        },
      },
      prepare: {
        on: {
          ready: [
            {
              target: "ready",
              actions: [],
            },
          ],
          postpone: [
            {
              target: "racepostponed",
              actions: [],
            },
          ],
          assignRaceTime: [
            {
              target: "prepare",
              actions: [
                {
                  type: "assignRaceTime",
                },
              ],
            },
          ],
        },
      },
      racepostponed_ashore: {
        on: {
          raceinfo: [
            {
              target: "raceinfo",
              actions: [],
            },
          ],
        },
      },
      racepostponed_today: {
        on: {
          raceinfo: [
            {
              target: "raceinfo",
              actions: [],
            },
          ],
        },
      },
      ready: {
        on: {
          start: [
            {
              target: "start",
              actions: [],
            },
          ],
          postpone: [
            {
              target: "racepostponed",
              actions: [],
            },
          ],
          assignRaceTime: [
            {
              target: "ready",
              actions: [
                {
                  type: "assignRaceTime",
                },
              ],
            },
          ],
        },
      },
      start: {
        after: {
          2000: [
            {
              target: "#RegattaRaceSequence.racetimer",
              actions: [],
            },
          ],
        },
        on: {
          postpone: [
            {
              target: "racepostponed",
              actions: [],
            },
          ],
          assignRaceTime: [
            {
              target: "start",
              actions: [
                {
                  type: "assignRaceTime",
                },
              ],
            },
          ],
        },
      },
      racetimer: {
        on: {
          recallall: [
            {
              target: "recallall",
              actions: [
                {
                  type: "stopSequenceTimer",
                },
              ],
            },
          ],
          racecompleted: [
            {
              target: "raceresults",
              actions: [
                {
                  type: "stopSequenceTimer",
                },
              ],
            },
          ],
          abandon: [
            {
              target: "abandon",
              actions: [
                {
                  type: "stopSequenceTimer",
                },
              ],
            },
          ],
          recallone: [
            {
              target: "recallone",
              actions: [],
            },
          ],
          assignRaceTime: [
            {
              target: "racetimer",
              actions: [
                {
                  type: "assignRaceTime",
                },
              ],
            },
          ],
        },
      },
      recallall: {
        on: {
          raceinfo: [
            {
              target: "raceinfo",
              actions: [],
            },
          ],
        },
      },
      raceresults: {
        on: {
          raceinfo: [
            {
              target: "raceinfo",
              actions: [],
            },
          ],
          today: [
            {
              target: "abandon_today",
              actions: [],
            },
          ],
          ashore: [
            {
              target: "abandon_ashore",
              actions: [],
            },
          ],
        },
      },
      abandon: {
        on: {
          ashore: [
            {
              target: "abandon_ashore",
              actions: [],
            },
          ],
          today: [
            {
              target: "abandon_today",
              actions: [],
            },
          ],
          raceinfo: [
            {
              target: "raceinfo",
              actions: [],
            },
          ],
        },
      },
      recallone: {
        on: {
          continue: [
            {
              target: "racetimer",
              actions: [],
            },
          ],
        },
      },
      abandon_today: {
        on: {
          raceinfo: [
            {
              target: "raceinfo",
              actions: [],
            },
          ],
        },
      },
      abandon_ashore: {
        on: {
          raceinfo: [
            {
              target: "raceinfo",
              actions: [],
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      stopSequenceTimer: sendTo("sequenceTimer", {
        type: "stop",
      }),
      startSequenceTimer: sendTo("sequenceTimer", {
        type: "start",
      }),
      assignRaceTime: assign({
        raceTime: ({ event }) => {
          return event.raceTime;
        },
      }),
      clearRaceTime: assign({
        raceTime: ({ event }) => {
          return 0;
        },
      }),
    },
    actors: {
      sequenceTimer: fromCallback(({ sendBack, receive }) => {
        let intervalID = null;

        receive((event) => {
          if (event.type == "start") {
            const startTime = Date.now() + 5 * 60 * 1000 + 3;

            const timeSequence = [
              { time: -4 * 60, event: "prepare" },
              { time: -1 * 60, event: "ready" },
              { time: -1 * 10, event: "countdown" },
              { time: 0, event: "start" },
            ];

            intervalID = setInterval(() => {
              const currentTime = Date.now();
              const raceTime = Math.round((currentTime - startTime) / 1000);
              // send an event to the parent Actor, containing the raceTime
              sendBack({ type: "assignRaceTime", raceTime: raceTime });

              // send sequence events to the parent Actor
              if (timeSequence[0] && timeSequence[0].time == raceTime) {
                sendBack({ type: timeSequence[0].event });
                timeSequence.shift();
              }
            }, 1000);
          }

          if (event.type == "stop") {
            clearInterval(intervalID);
          }
        });

        return () => {
          clearInterval(intervalID);
        };
      }),
    },
    guards: {},
    delays: {},
  }
);
