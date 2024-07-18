<template>
  <q-page>
    <q-card v-if="raceTimer.matches('raceinfo')" flat>
      <q-card-section class="row">
        <q-img class="col-6" src="racesignals/lima.svg" />
        <div class="col-12 text-h5 q-mt-sm q-mb-xs">Race Information</div>

        <q-select
          class="col-12"
          label="Time Sequence"
          v-model="raceTimer.timerSequenceModel"
          :options="raceTimer.timerSequeceOptions"
          color="primary"
          options-selected-class="text-deep-orange"
          @update:model-value="raceTimer.publishRaceTimerState()"
        >
          <template v-slot:selected>
            {{ raceTimer.timerSequenceModel.label }} :
            {{ raceTimer.timerSequenceModel.description }}
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          class="col-12"
          label="Class Flag"
          v-model="raceTimer.classFlagModel"
          :options="raceTimer.classFlagOptions"
          color="primary"
          options-selected-class="text-deep-orange"
          @update:model-value="raceTimer.publishRaceTimerState()"
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
          class="col-12"
          label="Preparation Flag"
          v-model="raceTimer.prepareFlagModel"
          :options="raceTimer.prepareFlagOptions"
          color="secondary"
          options-selected-class="text-deep-orange"
          @update:model-value="raceTimer.publishRaceTimerState()"
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
          class="col-12"
          label="Personal Flotation Device"
          v-model="raceTimer.yankeeFlagModel"
          :options="raceTimer.yankeeFlagOptions"
          color="yellow"
          options-selected-class="text-yellow"
          @update:model-value="raceTimer.publishRaceTimerState()"
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
          @click="raceTimer.raceclassTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('raceclass')" flat>
      <q-card-section class="fit row">
        <q-img
          class="col-5 q-my-xs q-mr-xs"
          :src="raceTimer.classFlagModel.image"
        />
        <q-img class="col-5 q-my-xs q-mr-xs" src="" />
        <div class="col-1 q-my-xs">
          <div class="q-mb-xs">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
          <!--div class="q-mb-xs">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
          <div>
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div-->
        </div>
        <div class="col-12 text-caption text-center q-my-xs">
          {{ raceTimer.timerSequenceModel.description }}
        </div>
        <div
          class="col-12 text-center q-my-xs"
          style="font-size: 45vmin; line-height: 10rem"
        >
          {{ raceTimeFormatter }}
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

    <q-card v-if="raceTimer.matches('raceprepare')" flat>
      <q-card-section class="fit row">
        <q-img
          class="col-5 q-my-xs q-mr-xs"
          :src="raceTimer.classFlagModel.image"
        />
        <q-img
          class="col-5 q-my-xs q-mr-xs"
          :src="raceTimer.prepareFlagModel.image"
        />
        <div class="col-1 q-my-xs">
          <div class="q-mb-xs">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
          <!--div class="q-mb-xs">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
          <div>
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div-->
        </div>
        <div class="col-12 text-caption text-center q-my-xs">
          {{ raceTimer.timerSequenceModel.description }}
        </div>
        <div
          class="col-12 text-center q-my-xs"
          style="font-size: 45vmin; line-height: 10rem"
        >
          {{ raceTimeFormatter }}
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

    <q-card v-if="raceTimer.matches('raceready')" flat>
      <q-card-section class="fit row">
        <q-img
          class="col-5 q-my-xs q-mr-xs"
          :src="raceTimer.classFlagModel.image"
        />
        <q-img class="col-5 q-my-xs q-mr-xs" src="" />
        <div class="col-1 q-my-xs">
          <div class="q-mb-xs">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
          <!--div class="q-mb-xs">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
          <div>
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div-->
        </div>
        <div class="col-12 text-caption text-center q-my-xs">
          {{ raceTimer.timerSequenceModel.description }}
        </div>
        <div
          class="col-12 text-center q-my-xs"
          style="font-size: 45vmin; line-height: 10rem"
        >
          {{ raceTimeFormatter }}
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

    <q-card v-if="raceTimer.matches('racestart')" flat>
      <q-card-section class="row fit justify-start">
        <div class="col-10" style="font-size: 12vmin">
          {{ raceTimeFormatter }}
        </div>
        <div class="col-1 q-ml-xs q-my-xs">
          <div class="q-mb-xs">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
        </div>

        <div class="col-12 text-center" style="font-size: 30vmin">START</div>
      </q-card-section>

      <q-card-actions class="fixed-bottom-right">
        <q-btn
          flat
          color="secondary"
          label="Postpone"
          @click="raceTimer.postponeraceTransition()"
        />

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
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('racetimer')" flat>
      <q-card-section class="row fit justify-start">
        <div class="col-10" style="font-size: 12vmin">
          {{ raceTimeFormatter }}
        </div>
        <div class="col-1 q-ml-xs q-my-xs">
          <div class="q-mb-xs">
            <q-avatar square size="3.4rem">
              <q-img :src="raceTimer.yankeeFlagModel.image" />
            </q-avatar>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row fit justify-start items-center">
        <div class="col-6" style="font-size: 10vmin">SOG:</div>
        <div
          class="col-6 text-center"
          style="font-size: 30vmin; line-height: 5rem"
        >
          {{ vmc.sog }}
        </div>
      </q-card-section>

      <q-card-section class="row fit justify-start items-center">
        <div class="col-6">
          <div style="font-size: 10vmin">VMC:</div>
          <div class="row fit">
            <div v-if="vmc.lon == 0 || vmc.lat == 0" class="col-8 text-caption">
              set the windward mark coordinates
            </div>
            <div v-else class="col-8">
              <div class="text-caption">
                N {{ parseFloat(vmc.lat).toFixed(3) }}
              </div>
              <div class="text-caption">
                E {{ parseFloat(vmc.lon).toFixed(3) }}
              </div>
            </div>

            <div class="col-4 self-end">
              <q-btn
                round
                color="primary"
                icon="room"
                @click="vmc.setCoordinates(gps.lon, gps.lat)"
              />
            </div>
          </div>
        </div>

        <div
          v-if="vmc.lon == 0 || vmc.lat == 0"
          class="col-6 text-center"
          style="font-size: 30vmin; line-height: 5rem"
        >
          -
        </div>
        <div
          v-else
          class="col-6 text-center"
          style="font-size: 30vmin; line-height: 5rem"
        >
          {{ vmc.vmc }}
        </div>
      </q-card-section>

      <q-card-section class="row fit justify-start items-center">
        <div class="col-6">
          <div style="font-size: 10vmin">Efficiency:</div>
        </div>

        <div
          v-if="vmc.lon == 0 || vmc.lat == 0"
          class="col-6 text-center"
          style="font-size: 30vmin; line-height: 5rem"
        >
          -
        </div>
        <div
          v-else
          class="col-6 text-center"
          style="font-size: 30vmin; line-height: 5rem"
        >
          {{ vmc.efficiency }}
        </div>
      </q-card-section>

      <q-card-actions class="fixed-bottom" align="center">
        <q-btn
          flat
          color="secondary"
          label="Abandon Race"
          @click="raceTimer.abandonTransition()"
        />
        <q-btn
          color="accent"
          label="Race Completed"
          @click="raceTimer.racecompletedTransition()"
        />
      </q-card-actions>
    </q-card>

    <q-card v-if="raceTimer.matches('racepostponed')" flat>
      <q-card-section>
        <q-img src="racesignals/apflag.svg" />
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
        <q-img src="racesignals/aphotel.svg" />
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
        <q-img src="racesignals/apalpha.svg" />
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
        <q-img src="racesignals/generalrecall.svg" />
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
        <q-img src="racesignals/xray.svg" />
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
        <q-img src="racesignals/november.svg" />
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
        <q-img src="racesignals/novhotel.svg" />
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
        <q-img src="racesignals/novalpha.svg" />
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
import { useVmc } from "src/stores/vmc";
import { useGps } from "src/stores/gps";

const raceTimer = useRaceTimer();
const gps = useGps();
const vmc = useVmc();

export default defineComponent({
  name: "RegisterPage",
  components: {},

  setup() {
    return {
      raceTimer,
      vmc,
      gps,
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
      if (hours == 0 && minutes == 0 && this.raceTimer.raceTime <= 0) {
        return seconds;
      }

      // in the last minutes
      if (hours == 0 && this.raceTimer.raceTime <= 0) {
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
