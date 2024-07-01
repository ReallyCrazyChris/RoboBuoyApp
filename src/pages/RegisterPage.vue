<template>
  <q-page>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="fit row wrap justify-start items-start content-start">
          <div class="col-10 self-center text-h6">Boat Registration</div>
          <div class="col-2 self-center q-pa-sm">
            <q-btn
              round
              push
              color="primary"
              icon="share"
              @click="shareRegistration()"
            >
              <q-tooltip class="primary">Invite Others</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <div>
        <q-card-section class="q-pt-none">
          Register your boat and crew to participate in the regatta
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="boat.sailnumber"
              label="Sail number *"
              hint="e.g. GER1234"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              filled
              v-model="boat.crewlist"
              label="Crew List *"
              hint="e.g. Emily Hoonan, Jach Jones"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <div>
              <q-btn label="Register" type="submit" color="primary" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useBoat } from "src/stores/boat";
const boat = useBoat();

export default defineComponent({
  name: "RegisterPage",
  components: {},
  setup() {
    return {
      boat,
    };
  },
  methods: {
    onReset() {
      boat.sailnumber = "";
      boat.crewlist = "";
    },
    onSubmit() {
      boat.submit();
    },

    shareRegistration() {
      const data = {
        title: "Regatta Registration",
        text: "Ahoy sailor... come join the regatta",
        url: "https://reallycrazychris.github.io/#/register",
      };

      navigator.share(data);
    },
  },
});
</script>
