<template>
  <q-layout view="Lhh lpR fff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/logo-mono-white.svg" />
          </q-avatar>
          Robo Regatta
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header></q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { $bluetooth } from "src/networking/bluetooth";
import { useDevicesStore } from "stores/devicesStore";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Regatta",
    caption: "about the regatta",
    icon: "emoji_events",
    link: "#/regatta",
  },

  {
    title: "Course",
    caption: "setup and define the course",
    icon: "map",
    link: "#/racecourse",
  },
  {
    title: "Marks",
    caption: "add, remove and configure marks",
    icon: "tour",
    link: "#/myrobots",
  },

  {
    title: "Register",
    caption: "particiapte in the regatta",
    icon: "sailing",
    link: "#/register",
  },
  {
    title: "Timer",
    caption: "race start timer",
    icon: "timer",
    link: "#/timer",
  },
  {
    title: "VMC",
    caption: "velocity made course",
    icon: "speed",
    link: "#/vmc",
  },

  {
    title: "Results",
    caption: "document the results",
    icon: "sports_score",
    link: "#/results",
  },
];

export default defineComponent({
  name: "BasicLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const devicesStore = useDevicesStore();
    const leftDrawerOpen = ref(false);
    $bluetooth.reconnect();
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
