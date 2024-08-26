<template>
  <q-page>
    <q-card flat class="column" style="min-height: inherit">
      <q-card-section class="col q-pb-none">
        <div class="row q-pb-sm">
          <div class="col-12 text-h6">Regatta Notice</div>
        </div>

        <regattaSettingsEdit />
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
import regattaSettingsEdit from "src/components/regatta/regattaSettingsEdit.vue";

import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

export default defineComponent({
  name: "RegattaPage",
  components: {
    regattaSettingsEdit,
    regattaShare,
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
