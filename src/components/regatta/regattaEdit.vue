<template>
  <q-card flat class="row content-start" style="min-height: inherit">
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-6 text-h6 text-uppercase text-bold">Regatta Edit</div>
        <div class="col-6 text-right">
          <regattaShare class="q-mr-sm" />
          <q-btn label="save" color="primary" @click="backTransition()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" />
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="fit">
        <regattaInfo />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import regattaShare from "src/components/regatta/regattaShare.vue";
import regattaInfo from "src/components/regatta/regattaInfo.vue";

import { defineComponent } from "vue";
import { useRegattaInfo } from "src/stores/regattaInfo";
import { useRaceCourse } from "src/stores/raceCourse";

const regattainfo = useRegattaInfo();
const course = useRaceCourse();

export default defineComponent({
  name: "regattaEdit",
  components: {
    regattaShare,
    regattaInfo,
  },
  setup() {
    // makes sure the courseMap fills the parent element to the maximum
    return {
      regattainfo,
      course,
    };
  },
  methods: {
    backTransition() {
      this.regattainfo.publishRegattaInfoState();
      this.$router.go(-1);
    },
  },
});
</script>
