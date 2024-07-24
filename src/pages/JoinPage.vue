<template>
  <q-page>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="fit row wrap justify-start items-start content-start">
          <div class="col-10 self-center text-h6">
            Join: {{ regatta.title }}
          </div>
          <div class="col-2 self-center q-pa-sm">
            <shareregatta />
          </div>
          <div class="col-12 text-caption">{{ regatta.description }}</div>
          <div class="col-12 text-caption">{{ localDateTime }}</div>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md">
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
            hint="e.g. Rose Jacobs, Jack Gove"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-card-actions class="fixed-bottom" align="right">
            <wakelock />

            <q-btn label="Join" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import shareregatta from "src/components/regatta/RegattaShare.vue";

import wakelock from "src/components/WakeLock.vue";

import { useRegatta } from "src/stores/regatta";
const regatta = useRegatta();

import { useBoat } from "src/stores/boat";
const boat = useBoat();

export default defineComponent({
  name: "RegisterPage",
  components: {
    shareregatta,
    wakelock,
  },
  setup() {
    return {
      boat,
      regatta,
    };
  },
  methods: {
    onSubmit() {
      boat.submit();
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
