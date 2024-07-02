<template>
  <q-page>
    <q-card v-if="snapshot.matches('raceinfo')">
      <q-card-section>
        <q-img class="" src="~/src/assets/racesignals/lima.png" />
        <div class="text-h5 q-mt-sm q-mb-xs">Race Information</div>

        <q-select
          label="Time Sequence"
          v-model="timerSequenceModel"
          :options="timerSequeceOptions"
          color="primary"
          options-selected-class="text-deep-orange"
        >
          <template v-slot:selected>
            {{ timerSequenceModel.label }} :
            {{ timerSequenceModel.description }}
          </template>

          <!--template v-slot:append>
            <q-avatar square size="50px">
              <q-img :src="timerSequenceModel.image" />
            </q-avatar>
          </template-->

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <!--q-item-section avatar>
                <q-img :src="scope.opt.image" />
              </q-item-section-->
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          label="Class Flag"
          v-model="classFlagModel"
          :options="classFlagOptions"
          color="primary"
          options-selected-class="text-deep-orange"
        >
          <template v-slot:selected>
            {{ classFlagModel.label }}
            {{ classFlagModel.description }}
          </template>

          <template v-slot:append>
            <q-avatar square size="50px">
              <q-img :src="classFlagModel.image" />
            </q-avatar>
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-img :src="scope.opt.image" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          label="Preparation Flag"
          v-model="prepareFlagModel"
          :options="prepareFlagOptions"
          color="secondary"
          options-selected-class="text-deep-orange"
        >
          <template v-slot:selected>
            {{ prepareFlagModel.label }} :
            {{ prepareFlagModel.description }}
          </template>

          <template v-slot:append>
            <q-avatar square size="50px">
              <q-img :src="prepareFlagModel.image" />
            </q-avatar>
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-img :src="scope.opt.image" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          label="Personal Flotation Device"
          v-model="yankeeFlagModel"
          :options="yankeeFlagOptions"
          color="yellow"
          options-selected-class="text-yellow"
        >
          <template v-slot:selected>
            {{ yankeeFlagModel.description }}
          </template>

          <template v-slot:append>
            <q-avatar square size="50px">
              <q-img :src="yankeeFlagModel.image" />
            </q-avatar>
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-img :src="scope.opt.image" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="send({ type: 'postpone' })"
        />
        <q-btn
          color="positive"
          label="Start Race"
          @click="send({ type: 'startsequence' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('class')" flat>
      <q-card-section>
        <q-img :src="classFlagModel.image" />
        <div class="text-h1 q-mt-sm q-mb-xs text-center">
          {{ raceTimeFormatter }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-avatar square size="50px">
          <q-img :src="yankeeFlagModel.image" />
        </q-avatar>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="send({ type: 'postpone' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('prepare')" flat>
      <q-card-section>
        <q-img :src="prepareFlagModel.image" />
        <div class="text-h1 q-mt-sm q-mb-xs text-center">
          {{ raceTimeFormatter }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-avatar square size="50px">
          <q-img :src="yankeeFlagModel.image" />
        </q-avatar>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="send({ type: 'postpone' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('ready')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/classflag.png" />
        <div class="text-h1 q-mt-sm q-mb-xs text-center">
          {{ raceTimeFormatter }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-avatar square size="50px">
          <q-img :src="yankeeFlagModel.image" />
        </q-avatar>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="send({ type: 'postpone' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('start')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/start.png" />
        <div class="text-h1 q-mt-sm q-mb-xs text-center">START</div>
      </q-card-section>

      <q-card-section>
        <q-avatar square size="50px">
          <q-img :src="yankeeFlagModel.image" />
        </q-avatar>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="send({ type: 'postpone' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('racetimer')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/race.png" />
        <div class="text-h1 q-mt-sm q-mb-xs text-center">
          {{ raceTimeFormatter }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-avatar square size="50px">
          <q-img :src="yankeeFlagModel.image" />
        </q-avatar>
      </q-card-section>

      <q-card-actions class="fixed-bottom" align="center">
        <q-btn
          color="primary"
          label="Recall One"
          @click="send({ type: 'recallone' })"
        />

        <q-btn
          color="secondary"
          label="Recall All"
          @click="send({ type: 'recallall' })"
        />

        <q-btn
          color="accent"
          label="Race Completed"
          @click="send({ type: 'racecompleted' })"
        />
        <q-btn
          flat
          color="secondary"
          label="Abandon Race"
          @click="send({ type: 'abandon' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('racepostponed')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/apflag.png" />
        <div class="text-h3 q-mt-sm q-mb-xs">Raceing Postponed</div>
        <div class="text-h6 text-grey">Racing may continue when practical.</div>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="primary"
          label="go to shore"
          @click="send({ type: 'ashore' })"
        />
        <q-btn
          flat
          color="primary"
          label="postpone for today"
          @click="send({ type: 'today' })"
        />
        <q-btn
          color="primary"
          label="Race info"
          @click="send({ type: 'raceinfo' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('racepostponed_ashore')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/aphotel.png" />
        <div class="text-h3 q-mt-sm q-mb-xs">Raceing Postponed</div>
        <div class="text-h6 text-grey">
          Return to shore for further informaiton.
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          color="primary"
          label="Race info"
          @click="send({ type: 'raceinfo' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('racepostponed_today')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/apalpha.png" />
        <div class="text-h3 q-mt-sm q-mb-xs">Raceing Postponed</div>
        <div class="text-h6 text-grey">No further racing today.</div>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          color="primary"
          label="Race info"
          @click="send({ type: 'raceinfo' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('recallall')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/generalrecall.png" />
        <div class="text-h3 q-mt-sm q-mb-xs">General Recall</div>
        <div class="text-h6 text-grey">
          This race has been recalled. Return to the start line. Prepare for a
          restart.
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          color="primary"
          label="Race info"
          @click="send({ type: 'raceinfo' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('recallone')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/xray.png" />
        <div class="text-h3 q-mt-sm q-mb-xs">Individual Recall</div>
        <div class="text-h6 text-grey">
          One or more race participans where On Course Side (OCS). Please
          exonerate by crossing the start line.
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          color="primary"
          label="Continue"
          @click="send({ type: 'continue' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('abandon')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/november.png" />
        <div class="text-h3 q-mt-sm q-mb-xs">Race Abandoned</div>
        <div class="text-h6 text-grey">This race is Abandoned.</div>
      </q-card-section>

      <q-card-actions class="fixed-bottom" align="center">
        <q-btn
          flat
          color="secondary"
          label="Go to shore"
          @click="send({ type: 'ashore' })"
        />
        <q-btn
          flat
          color="secondary"
          label="Racing Completed"
          @click="send({ type: 'today' })"
        />
        <q-btn
          color="primary"
          label="Race info"
          @click="send({ type: 'raceinfo' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('abandon_ashore')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/novhotel.png" />
        <div class="text-h3 q-mt-sm q-mb-xs">Go To Shore</div>
        <div class="text-h6 text-grey">
          All remaning races are abandned. More information will be availabe on
          shore.
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom" align="center">
        <q-btn
          flat
          color="primary"
          label="Race Info"
          @click="send({ type: 'raceinfo' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('abandon_today')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/novalpha.png" />
        <div class="text-h3 q-mt-sm q-mb-xs">Racing Completed</div>
        <div class="text-h6 text-grey">
          All remaining races are abandoned. There is no more racing today.
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom" align="center">
        <q-btn
          flat
          color="primary"
          label="Race Info"
          @click="send({ type: 'raceinfo' })"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="snapshot.matches('raceresults')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/results.png" />
        <div class="text-overline text-orange-9">PRELIMINARY RESULT</div>
        <div class="text-h3 q-mt-sm q-mb-xs">Race 1</div>
        <div class="text-h6 text-grey">12-06-2024 : 11:35am - 12:02pm</div>
        <div class="text-h6 text-grey">
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">Pos</th>
                <th class="text-left">Number</th>
                <th class="text-left">Crew</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">1</td>
                <td class="text-left">29er 1159</td>
                <td class="text-left">Anna Metz, Ron Coutrage</td>
              </tr>
              <tr>
                <td class="text-left">1</td>
                <td class="text-left">29er 2127</td>
                <td class="text-left">Sint McCarthy, David Bush</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom" align="center">
        <q-btn
          flat
          color="secondary"
          label="Go to shore"
          @click="send({ type: 'ashore' })"
        />
        <q-btn
          flat
          color="secondary"
          label="Racing Completed"
          @click="send({ type: 'today' })"
        />
        <q-btn
          color="primary"
          label="New Race"
          @click="send({ type: 'raceinfo' })"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMachine } from "@xstate/vue";
import { machine } from "src/states/raceTimer.js";

export default defineComponent({
  name: "RegisterPage",
  components: {},

  setup() {
    const { snapshot, actorRef, send } = useMachine(machine);

    console.log(snapshot, actorRef, send);
    return {
      snapshot,
      send,

      timerSequeceOptions: [
        {
          label: "1 minute",
          value: "1",
          description: "1m - 30s - Start ",
          image: "src/assets/sequcence/1minute.png",
        },

        {
          label: "2 minute",
          value: "2",
          description: "2m - 30s - Start ",
          image: "src/assets/sequcence/2minute.png",
        },
        {
          label: "5 minute",
          value: "5",
          description: "5m - 4m - 1m - Start ",
          image: "src/assets/sequcence/5minute.png",
        },
        {
          label: "10 minute",
          value: "10",
          description: "10m - 9m - 1m - Start ",
          image: "src/assets/sequcence/10minute.png",
        },
      ],

      timerSequenceModel: ref({
        label: "5 minute",
        value: "5",
        description: "5m - 4m - 1m - Start ",
        image: "src/assets/sequcence/5minute.png",
      }),

      prepareFlagOptions: [
        {
          label: "Papa",
          value: "P",
          description: "Prepare",
          image: "src/assets/racesignals/papa.png",
        },
        {
          label: "Italy",
          value: "I",
          description: "Rule 30.1",
          image: "src/assets/racesignals/italy.png",
        },
        {
          label: "Zulu",
          value: "Z",
          description: "Rule 30.2",
          image: "src/assets/racesignals/zulu.png",
        },
        {
          label: "Uniform",
          value: "U",
          description: "Rule 30.3",
          image: "src/assets/racesignals/uniform.png",
        },
        {
          label: "Black",
          value: "B",
          description: "Rule 30.4",
          image: "src/assets/racesignals/black.png",
        },
      ],

      prepareFlagModel: ref({
        label: "Uniform",
        value: "U",
        description: "Rule 30.3",
        image: "src/assets/racesignals/uniform.png",
      }),

      classFlagOptions: [
        {
          label: "Optimist",
          value: "optimist",
          description: "",
          image: "src/assets/boatclasses/optimist.png",
        },
        {
          label: "29er",
          value: "29er",
          description: "",
          image: "src/assets/boatclasses/29er.png",
        },
        {
          label: "ILCA",
          value: "ilca",
          description: "",
          image: "src/assets/boatclasses/ilca.png",
        },
      ],

      classFlagModel: ref({
        label: "Optimist",
        value: "optimist",
        description: "",
        image: "src/assets/boatclasses/optimist.png",
      }),

      yankeeFlagOptions: [
        {
          label: "Yankee",
          value: true,
          description: "Wear personal flotation device",
          image: "src/assets/racesignals/yankee.png",
        },
        {
          label: "No Yankee",
          value: false,
          description: "personal flotation devices optional",
          image: "",
        },
      ],

      yankeeFlagModel: ref({
        label: "Yankee",
        value: true,
        description: "Wear personal flotation device",
        image: "src/assets/racesignals/yankee.png",
      }),
    };
  },
  computed: {
    raceTimeFormatter() {
      if (this.snapshot.context.raceTime == undefined) {
        return "--:--";
      }

      var racetime = Math.abs(this.snapshot.context.raceTime);

      // extract hours
      var hours = parseInt(racetime / 3600);
      // remaining seconds
      var remaining_seconds = parseInt(racetime % 3600);
      // extract minutes:
      var minutes = parseInt(remaining_seconds / 60); // 60 seconds in 1 minute
      var seconds = parseInt(remaining_seconds % 60);

      let hoursStr = ("00" + hours).slice(-2);
      let minutesStr = ":" + ("00" + minutes).slice(-2);
      let secondsStr = ":" + ("00" + seconds).slice(-2);

      // in the last seconds
      if (hours == 0 && minutes == 0) {
        return seconds;
      }

      // in the last minutes
      if (hours == 0) {
        return minutes + secondsStr;
      }
      // show the full time
      return hoursStr + minutesStr + secondsStr;
    },
  },
  methods: {
    shareTimer() {
      const data = {
        title: "Race Timer",
        text: "Ahoy sailor... ready to race",
        url: "https://reallycrazychris.github.io/#/timer",
      };

      navigator.share(data);
    },
  },
});
</script>
