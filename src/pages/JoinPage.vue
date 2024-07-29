<template>
  <q-page>
    <div style="max-width: 400px">
      <q-card flat bordered>
        <q-card-section>
          <div class="fit row wrap justify-start items-start content-start">
            <div class="col-10">
              <div class="text-h6">Join: {{ regatta.title }}</div>
              <div class="text-caption">{{ regatta.description }}</div>
              <div class="text-caption">{{ localDateTime }}</div>
            </div>
            <div class="col q-pa-sm">
              <shareregatta />
            </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-pa-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="participant.sailnumber"
              label="Sail number *"
              hint="e.g. GER1234"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              filled
              v-model="participant.crewlist"
              label="Crew List *"
              hint="e.g. Rose Jacobs, Jack Gove"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-card-actions align="right">
              <q-btn label="Join" type="submit" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import shareregatta from "src/components/regatta/RegattaShare.vue";

import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

import { useParticipant } from "src/stores/participant";
const participant = useParticipant();

export default defineComponent({
  name: "RegisterPage",
  components: {
    shareregatta,
  },
  setup() {
    return {
      participant,
      regatta,
    };
  },
  methods: {
    onSubmit() {
      participant.submit();
      this.$router.push("timer");
    },
  },
  computed: {
    localDateTime() {
      const date = new Date(regatta.date);
      return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
    },
  },
});
</script>
