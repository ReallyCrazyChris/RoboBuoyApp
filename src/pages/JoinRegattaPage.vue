<template>
  <q-page>
    <div class="column" style="min-height: inherit">
      <div class="col q-py-none">
        <q-card flat>
          <q-card-section class="q-pb-xs">
            <div class="text-h6">Join Regatta</div>

            <regattaOptions />
            <raceCourseOptions />
            <raceInfoOptions />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="col-1 q-p-none">
      <q-card flat>
        <q-card-actions align="right">
          <q-btn
            flat
            color="secondary"
            label="No Thanks!"
            @click="noThanksTransition()"
          />
          <q-btn color="positive" label="Join" @click="raceInfoTransition()" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import regattaOptions from "src/components/regatta/regattaOptions.vue";
import raceCourseOptions from "src/components/course/raceCourseOptions.vue";
import raceInfoOptions from "src/components/timer/raceInfoOptions.vue";

import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

export default defineComponent({
  name: "RegattaPage",
  components: { regattaOptions, raceInfoOptions, raceCourseOptions },
  setup() {
    // makes sure the raceCourseMap fills the parent element to the maximum
    return {
      regatta,
    };
  },

  methods: {
    noThanksTransition() {
      this.$router.push("");
    },
    raceInfoTransition() {
      this.$router.push("racetimer");
    },
  },
});
</script>
