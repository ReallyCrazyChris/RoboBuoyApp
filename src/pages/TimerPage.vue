<template>
  <q-page>
    <q-card v-if="raceTimer.matches('raceinfo')" flat>
      <q-card-section>
        <q-img class="" src="~/src/assets/racesignals/lima.png" />
        <div class="text-h5 q-mt-sm q-mb-xs">Race Information</div>

        <q-select
          label="Time Sequence"
          v-model="raceTimer.timerSequenceModel"
          :options="raceTimer.timerSequeceOptions"
          color="primary"
          options-selected-class="text-deep-orange"
        >
          <template v-slot:selected>
            {{ raceTimer.timerSequenceModel.label }} :
            {{ raceTimer.timerSequenceModel.description }}
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
          v-model="raceTimer.classFlagModel"
          :options="raceTimer.classFlagOptions"
          color="primary"
          options-selected-class="text-deep-orange"
        >
          <template v-slot:selected>
            {{ raceTimer.classFlagModel.label }}
            {{ raceTimer.classFlagModel.description }}
          </template>

          <template v-slot:append>
            <q-avatar square size="50px">
              <q-img :src="raceTimer.classFlagModel.image" />
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
          v-model="raceTimer.prepareFlagModel"
          :options="raceTimer.prepareFlagOptions"
          color="secondary"
          options-selected-class="text-deep-orange"
        >
          <template v-slot:selected>
            {{ raceTimer.prepareFlagModel.label }} :
            {{ raceTimer.prepareFlagModel.description }}
          </template>

          <template v-slot:append>
            <q-avatar square size="50px">
              <q-img :src="raceTimer.prepareFlagModel.image" />
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
          v-model="raceTimer.yankeeFlagModel"
          :options="raceTimer.yankeeFlagOptions"
          color="yellow"
          options-selected-class="text-yellow"
        >
          <template v-slot:selected>
            {{ raceTimer.yankeeFlagModel.description }}
          </template>

          <template v-slot:append>
            <q-avatar square size="50px">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
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
          @click="raceTimer.postponeraceTransition()"
        />
        <q-btn
          color="positive"
          label="Start Race"
          @click="raceTimer.startraceTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('raceclass')" flat>
      <q-card-section>
        <q-img :src="raceTimer.classFlagModel.image" />
        <q-avatar square size="50px">
          <q-img :src="raceTimer.yankeeFlagModel.image" />
        </q-avatar>
        <div style="font-size: 45vmin" class="text-center">
          {{ raceTimeFormatter }}
        </div>

        <div class="text-caption text-center">
          {{ raceTimer.timerSequenceModel.description }}
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="raceTimer.postponeraceTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('prepare')" flat>
      <q-card-section>
        <q-img :src="raceTimer.prepareFlagModel.image" />
        <q-avatar square size="50px">
          <q-img :src="raceTimer.yankeeFlagModel.image" />
        </q-avatar>
        <div style="font-size: 45vmin" class="text-center">
          {{ raceTimeFormatter }}
        </div>

        <div class="text-caption text-center">
          {{ raceTimer.timerSequenceModel.description }}
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="raceTimer.postponeraceTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('ready')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/classflag.png" />

        <q-avatar square size="50px">
          <q-img :src="raceTimer.yankeeFlagModel.image" />
        </q-avatar>
        <div style="font-size: 45vmin" class="text-center">
          {{ raceTimeFormatter }}
        </div>

        <div class="text-caption text-center">
          {{ raceTimer.timerSequenceModel.description }}
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="raceTimer.postponeraceTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('start')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/start.png" />
        <div style="font-size: 30vmin" class="q-mt-sm q-mb-xs text-center">
          START
        </div>

        <q-avatar square size="50px">
          <q-img :src="raceTimer.yankeeFlagModel.image" />
        </q-avatar>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone Race"
          @click="raceTimer.postponeraceTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('racetimer')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/race.png" />
        <q-avatar square size="50px">
          <q-img :src="raceTimer.yankeeFlagModel.image" />
        </q-avatar>
        <div style="font-size: 20vmin" class="text-center">
          {{ raceTimeFormatter }}
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom" align="center">
        <q-btn
          color="primary"
          label="Recall One"
          @click="raceTimer.recalloneTransition()"
        />

        <q-btn
          color="secondary"
          label="Recall All"
          @click="raceTimer.recallallTransition()"
        />

        <q-btn
          color="accent"
          label="Race Completed"
          @click="raceTimer.racecompletedTransition()"
        />
        <q-btn
          flat
          color="secondary"
          label="Abandon Race"
          @click="raceTimer.abandonTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('racepostponed')" flat>
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
          @click="raceTimer.postponeashoreTransition"
        />
        <q-btn
          flat
          color="primary"
          label="postpone for today"
          @click="raceTimer.postponetodayTransition()"
        />
        <q-btn
          color="primary"
          label="Race info"
          @click="raceTimer.raceinfoTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('racepostponed_ashore')" flat>
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
          @click="raceTimer.raceinfoTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('racepostponed_today')" flat>
      <q-card-section>
        <q-img src="~/src/assets/racesignals/apalpha.png" />
        <div class="text-h3 q-mt-sm q-mb-xs">Raceing Postponed</div>
        <div class="text-h6 text-grey">No further racing today.</div>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          color="primary"
          label="Race info"
          @click="raceTimer.raceinfoTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('recallall')" flat>
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
          @click="raceTimer.raceinfoTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('recallone')" flat>
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
          @click="raceTimer.racecontinueTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('raceabandoned')" flat>
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
          @click="raceTimer.abandonashoreTransition()"
        />
        <q-btn
          flat
          color="secondary"
          label="Racing Completed"
          @click="raceTimer.abandontodayTransition()"
        />
        <q-btn
          color="primary"
          label="Race info"
          @click="raceTimer.raceinfoTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('raceabandoned_ashore')" flat>
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
          @click="raceTimer.raceinfoTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('raceabandoned_today')" flat>
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
          @click="raceTimer.raceinfoTransition()"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRaceTimer } from "src/stores/raceTimer";

const raceTimer = useRaceTimer();

export default defineComponent({
  name: "RegisterPage",
  components: {},

  setup() {
    return {
      raceTimer,
    };
  },
  computed: {
    raceTimeFormatter() {
      if (this.raceTimer.raceTime == undefined) {
        return "--:--";
      }

      var racetime = Math.abs(this.raceTimer.raceTime);

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
