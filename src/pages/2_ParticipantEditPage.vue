<template>
  <q-card
    flat
    class="regatta-view row content-start"
    style="min-height: inherit"
  >
    <q-card-section class="col-12">
      <div class="row">
        <div class="col-6 text-h6 text-uppercase text-weight-bold">
          Participants
        </div>
        <div class="col-6 text-right">
          <q-btn label="save" color="primary" @click="saveTransition()" />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="col-12">
      <div class="fit row">
        <div class="col-12">
          <regattaParticipantsEdit />
        </div>
        <div class="col-12 text-right q-pt-sm">
          <q-btn
            color="positive"
            label="add"
            @click="participantaddTransition()"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import regattaParticipantsEdit from "/src/components/regatta/regattaParticipantsEdit.vue";

export default {
  name: "participantEditPage",
  components: {
    regattaParticipantsEdit,
  },

  setup(props) {
    return {};
  },

  methods: {
    saveTransition() {
      this.$router.go(-1);
    },

    participantaddTransition() {
      this.$router.push("participantadd");
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
