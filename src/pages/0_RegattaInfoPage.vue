<template>
  <q-card
    flat
    class="regatta-view row content-start"
    style="min-height: inherit"
  >
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-6 text-h6 text-uppercase text-weight-bold">Regatta</div>
        <div class="col-6 text-right">
          <regattaShare class="q-mr-sm" />
          <q-btn label="edit" color="primary" @click="editTransition()" />
        </div>
      </div>
      <q-separator class="q-mt-sm" />
    </q-card-section>

    <q-card-section class="col-xs-12 col-md-6">
      <div class="fit">
        <regattaInfo :readonly="true" />
      </div>
    </q-card-section>

    <q-card-actions class="col-12 q-pt-sm">
      <div class="fit text-right">
        <q-btn
          class="q-mr-sm"
          color="positive"
          label="course"
          @click="nextTransition()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import regattaShare from "src/components/regatta/regattaShare.vue";
import regattaInfo from "src/components/regatta/regattaInfo.vue";

export default {
  name: "RegattaInfoPage",
  components: {
    regattaShare,
    regattaInfo,
  },

  setup(props) {
    return {};
  },

  methods: {
    editTransition() {
      this.$router.push("regattaedit");
    },

    nextTransition() {
      this.$router.push("courseinfo");
    },
  },
};
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

.regatta-view .q-select__dropdown-icon {
  visibility: hidden;
}
</style>
