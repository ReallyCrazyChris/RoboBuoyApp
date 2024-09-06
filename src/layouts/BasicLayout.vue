<template>
  <q-layout @click.once="captureUserInteractionEvent" view="hHh lpr fff">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bolder">
          QuickRace
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
        <q-item-label header>Quick Race</q-item-label>

        <div @click="itemClicked">
          <div v-for="item in essentialLinks" :key="item.title">
            <q-item clickable tag="a" target="_self" :href="item.link">
              <q-item-section v-if="item.icon" avatar>
                <q-icon :name="item.icon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.title }}</q-item-label>
                <q-item-label caption>{{ item.caption }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
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

import { useScreen } from "src/stores/screen";
import { useSounds } from "src/stores/sounds";
const screen = useScreen();
const sounds = useSounds();

const linksList = [
  {
    title: "Race",
    caption: "Regatta Info and timer",
    icon: "timer",
    link: "#/race",
  },

  {
    title: "Robots",
    caption: "add, remove and configure robotic marks",
    icon: "tour",
    link: "#/robots",
  },

  {
    title: "VMC",
    caption: "velocity made course",
    icon: "speed",
    link: "#/vmc",
  },
];

export default defineComponent({
  name: "BasicLayout",

  components: {},

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
      itemClicked() {
        leftDrawerOpen.value = false;
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
<style>
.fit-min-hieght {
  min-height: inherit;
}
</style>
