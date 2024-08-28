<template>
  <q-page>
    <q-card class="column" style="height: 100%; min-height: 100%">
      <q-card-section class="col">Initiate a Regatta</q-card-section>
      <q-card-section class="col">Select the Course</q-card-section>
      <q-card-section class="col">Share with Others</q-card-section>
      <q-card-section class="col">Start a Race</q-card-section>
      <q-card-section class="col">Start a Race</q-card-section>
      <q-separator></q-separator>
      <q-card-section class="col">Pair Robotic Buoy's</q-card-section>
      <q-card-section class="col">Boat Speed</q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>

<style>
.visible {
  border: 1px solid rgb(234, 9, 9);
}

.fontFit {
  border: 1px solid rgb(241, 238, 238);
  font-size: 16px;
  font-size: 20vmin;
}
</style>
