<template>
  <q-btn
    flat
    round
    dense
    :color="signalstrength_icon_color"
    :icon="signalstrength_icon"
  >
    <q-tooltip class="bg-dark text-white">{{ signalstrength }}dBm</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: "SignalStatus",
  props: ["signalstrength"],
  setup() {
    return {};
  },
  computed: {
    signalstrength_icon: function (props) {
      if (props.signalstrength > -80) {
        return "wifi";
      } else if (props.signalstrength > -95) {
        return "wifi_2_bar";
      } else {
        return "wifi_1_bar";
      }
    },

    signalstrength_icon_color: function (props) {
      if (props.signalstrength > -80) {
        return "green";
      } else if (props.signalstrength > -95) {
        return "orange";
      } else {
        return "red";
      }
    },
  },
};
</script>
