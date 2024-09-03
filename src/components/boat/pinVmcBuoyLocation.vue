<template>
  <div class="row">
    <div class="col-8">
      <div class="row">
        <div class="col-12 self-center">Pin the location of the vmc buoy</div>
        <div class="col-6 text-caption">
          N {{ parseFloat(vmc.lat).toFixed(3) }}
        </div>
        <div class="col-6 text-caption">
          E {{ parseFloat(vmc.lon).toFixed(3) }}
        </div>
      </div>
    </div>
    <div class="col-4 self-center text-right">
      <q-btn
        round
        color="primary"
        size="sm"
        icon="room"
        @click="vmc.setCoordinates(gps.lon, gps.lat)"
      />
    </div>
  </div>
</template>

<script>
import { useVmc } from "src/stores/vmc";
import { useGps } from "src/stores/gps";
const vmc = useVmc();
const gps = useGps();
export default {
  name: "pinVmcBuoyLocation",
  setup() {
    return { vmc, gps };
  },
};
</script>
