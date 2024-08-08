<template>
  <q-layout @click.once="captureUserInteractionEvent" view="hHh lpr fff">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bolder">
          Robo-Regatta
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      behavior="mobile"
      show-if-above
      elevated
    >
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

import { useScreen } from "src/stores/screen";
import { useSounds } from "src/stores/sounds";
const screen = useScreen();
const sounds = useSounds();

const linksList = [
  {
    title: "Regatta",
    caption: "create and share",
    icon: "emoji_events",
    link: "#/regatta",
  },
  /* {
    title: "Join",
    caption: "join to participate",
    icon: "sailing",
    link: "#/join",
  },
  */
  {
    title: "Timer",
    caption: "start race timer",
    icon: "timer",
    link: "#/timer",
  },

  /*{
    title: "Results",
    caption: "document the results",
    icon: "sports_score",
    link: "#/results",
  },
  */

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
    title: "VMC",
    caption: "velocity made course",
    icon: "speed",
    link: "#/vmc",
  },

  {
    title: "cource desginer",
    caption: "",
    icon: "campaign",
    link: "#/transformlayer",
  },
];

export default defineComponent({
  name: "BasicLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    //const devicesStore = useDevicesStore();
    //$bluetooth.reconnect();
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  methods: {
    captureUserInteractionEvent() {
      // once a user interaction is deteted
      // sounds and screen wakelock can be activated ( browser security )
      screen.requestWakeLock();
      sounds.userActionInit();
    },
  },
});
</script>
