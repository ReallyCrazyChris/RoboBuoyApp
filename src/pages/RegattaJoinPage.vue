<template>
  <q-page>
    <q-card flat class="column" style="min-height: inherit">
      <q-card-section class="col">
        <div class="row q-pb-md">
          <div class="col-6 text-h6 q-pb-md">Participate</div>

          <div class="col-6 q-pb-md" align="right">
            <regattaShare />
          </div>

          <div class="col-12 text-weight-bold">
            {{ regatta.name }} : {{ regatta.localDate }} @
            {{ regatta.localTime }}
          </div>

          <div class="col-12 text-caption text-weight-bold q-pb-sm">
            {{ regatta.description }}
          </div>

          <div class="col-6 text-caption self-center">
            {{ regatta.location }}
          </div>
          <div class="col-6 self-center text-right">
            <q-btn
              round
              size="sm"
              icon="map"
              color="primary"
              @click="showCourseTransition"
            />
          </div>
        </div>
        <q-separator />
        <div class="row q-py-md">
          <div class="col-6 text-caption">Earliest start</div>
          <div class="col-6 text-caption text-weight-bold text-center">
            {{ regatta.earliestStartTime }}
          </div>
          <div class="col-6 text-caption">Latest start</div>
          <div class="col-6 text-caption text-weight-bold text-center">
            {{ regatta.latestStartTime }}
          </div>
        </div>
        <q-separator />
        <div class="row q-py-md">
          <div class="col-12">
            <q-input
              class="q-pb-sm"
              filled
              v-model="participant.crewnames"
              label="crew names [ e.g.  alina rogers, john jakobs]"
              type="text"
            />
          </div>

          <div class="col-12">
            <q-input
              filled
              v-model="participant.sailnumber"
              label="sail number"
              type="text"
            />
          </div>
        </div>
        <q-separator />
      </q-card-section>

      <q-card-actions class="col-1">
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
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import regattaShare from "src/components/regatta/regattaShare.vue";

import { useParticipant } from "src/stores/participant";
import { useRegatta } from "src/stores/regatta";
import { useCourse } from "src/stores/course";

const participant = useParticipant();
const regatta = useRegatta();
const course = useCourse();

export default defineComponent({
  name: "RegattaPage",
  components: { regattaShare },
  setup() {
    // makes sure the courseMap fills the parent element to the maximum
    return {
      participant,
      regatta,
      course,
    };
  },

  methods: {
    showCourseTransition() {
      this.$router.push("course");
    },

    noThanksTransition() {
      this.$router.push("home");
    },
    raceInfoTransition() {
      this.$router.push("racetimer");
    },
  },
});
</script>
<style></style>
