<template>
  <q-btn
    flat
    round
    dense
    :class="battery_animation"
    :color="battery_icon_color"
    :icon="battery_icon"
  >
    <q-tooltip class="bg-dark text-white">Battery {{ battery }}%</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: "BatteryStatus",
  props: ["battery"],
  setup(props) {
    return {};
  },
  computed: {
    battery_icon: function (props) {
      if (props.battery > 90) {
        return "battery_full";
      } else if (props.battery > 70) {
        return "battery_6_bar";
      } else if (props.battery > 60) {
        return "battery_5_bar";
      } else if (props.battery > 50) {
        return "battery_4_bar";
      } else if (props.battery > 40) {
        return "battery_3_bar";
      } else if (props.battery > 30) {
        return "battery_2_bar";
      } else if (props.battery > 20) {
        return "battery_1_bar";
      } else if (props.battery > 10) {
        return "battery_0_bar";
      } else {
        return "battery_alert";
      }
    },

    battery_icon_color: function (props) {
      if (props.battery > 60) {
        return "green";
      } else if (props.battery > 40) {
        return "warning";
      } else if (props.battery > 20) {
        return "red";
      } else {
        return "pink";
      }
    },

    battery_animation: function (props) {
      if (props.battery > 30) {
        return "";
      } else {
        return "blinking";
      }
    },
  },
};
</script>
