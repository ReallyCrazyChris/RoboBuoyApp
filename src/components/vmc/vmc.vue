<template>
  <div class="row fit">
    <div class="col-6">
      <div class="fitFontSizeLarge">VMC</div>
      <div class="row q-pl-sm">
        <div class="col-5">
          <div class="text-caption">N {{ parseFloat(vmc.lat).toFixed(3) }}</div>
          <div class="text-caption">E {{ parseFloat(vmc.lon).toFixed(3) }}</div>
        </div>
        <div class="col-7 self-center">
          <q-btn
            round
            color="primary"
            size="sm"
            icon="room"
            @click="vmc.setCoordinates(gps.lon, gps.lat)"
          />
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="text-center fitFontSizeLarge">
        {{ vmc.vmc }}
      </div>
      <div class="text-center fitFontSizeMedium">knots</div>
    </div>
  </div>
</template>

<script>
import { useVmc } from "src/stores/vmc";
import { useGps } from "src/stores/gps";
const vmc = useVmc();
const gps = useGps();
export default {
  name: "vmcView",
  setup() {
    return { vmc, gps };
  },
};
</script>
<style>
.fitFontSizeLarge {
  font-size: 16px;
  font-size: 12vmin;
  line-height: 1;
}

.fitFontSizeMedium {
  font-size: 16px;
  font-size: 5vmin;
  line-height: 1;
}
</style>
