<template>
  <q-page>
    <q-card flat class="column" style="min-height: inherit">
      <q-card-section class="col q-pb-none">
        <div class="col-12 text-h6">Regatta Notice</div>
        <q-separator />
        <regattaSettings />
        <q-separator class="q-mt-sm" />
        <courseSettings />
        <locationSettings />

        <q-separator class="q-mt-sm" />
        <raceSettings />
      </q-card-section>
      <q-card-actions class="col-1" align="right">
        <regattaShare @click="regattaJoinTransition()" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import regattaShare from "src/components/regatta/regattaShare.vue";
import regattaSettings from "src/components/regatta/regattaSettings.vue";
import raceSettings from "src/components/race/raceSettings.vue";
import courseSettings from "src/components/course/courseSettings.vue";
import locationSettings from "src/components/course/locationSettings.vue";

import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

export default defineComponent({
  name: "RegattaPage",
  components: {
    regattaSettings,
    regattaShare,
    raceSettings,
    locationSettings,
    courseSettings,
  },
  setup() {
    // makes sure the courseMap fills the parent element to the maximum
    return {
      regatta,
    };
  },
  methods: {
    regattaJoinTransition() {
      this.regatta.publishRegattaState();
      this.$router.push("joinregatta");
    },
  },
});
</script>
