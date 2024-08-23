<template>
  <q-page>
    <q-card flat>
      <q-card-section class="q-pb-xs">
        <div class="row">
          <div class="col-12 text-h6">Participate</div>
        </div>
      </q-card-section>
    </q-card>
    <q-card flat>
      <q-card-section>
        <div class="row">
          <div class="col-12">
            <q-input
              :filled="!readonly"
              :readonly
              dense
              v-model="participant.crewnames"
              class="q-pb-sm"
              label="crew names [ e.g.  alina rogers, john jakobs]"
              type="text"
            />
          </div>

          <div class="col-12">
            <q-input
              :filled="!readonly"
              :readonly
              dense
              v-model="participant.sailnumber"
              class="q-pb-sm"
              label="sail number"
              type="text"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <div class="row fit">
          <div class="col-10">
            <q-btn
              flat
              color="secondary"
              label="No Thanks!"
              @click="noThanksTransition()"
            />
          </div>
          <div class="col-2 q-pr-sm" align="right">
            <q-btn
              color="positive"
              label="Join"
              @click="raceInfoTransition()"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>

    <q-separator />

    <q-card flat>
      <q-card-section>
        <div class="row">
          <div class="col-6 text-h6">Regatta Details</div>
          <div class="col-6 q-pr-sm" align="right"><regattaShare /></div>
        </div>

        <regattaSettingsEdit :readonly="true" />
        <courseSelection :readonly="true" />
        <div class="text-caption">
          Number of laps {{ course.lap.lapCount }},
        </div>
        <div class="text-caption">
          Course route {{ course.lap.description }}
        </div>
        <courseMap
          :height="300"
          show-map
          show-boundary
          show-zoom
          show-controls
          :readonly="true"
          :key="course.signature"
        ></courseMap>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import regattaSettingsEdit from "src/components/regatta/regattaSettingsEdit.vue";
import courseSelection from "src/components/course/courseSelection.vue";
import regattaShare from "src/components/regatta/regattaShare.vue";
import courseMap from "src/components/course/courseMap.vue";

import { useParticipant } from "src/stores/participant";
import { useRegatta } from "src/stores/regatta";
import { useCourse } from "src/stores/course";

const participant = useParticipant();
const regatta = useRegatta();
const course = useCourse();

export default defineComponent({
  name: "RegattaPage",
  props: ["readonly"],
  components: {
    regattaSettingsEdit,
    courseSelection,
    regattaShare,
    courseMap,
  },
  setup() {
    // makes sure the courseMap fills the parent element to the maximum
    return {
      participant,
      regatta,
      course,
    };
  },

  methods: {
    noThanksTransition() {
      this.$router.push("home");
    },
    raceInfoTransition() {
      this.$router.push("racetimer");
    },
  },
});
</script>
<style>
.q-field {
  &.q-field--readonly {
    &.q-field--standard {
      .q-field__control {
        &:before {
          border-bottom-style: none;
        }
      }
    }
  }
}
</style>
