<template>
  <div class="row">
    <div class="col-12">
      <div class="text-center fontSize q-pb-none">
        {{ vmc.vmc }}

        <div class="text-center fontSizeUnits q-pt-none">vmc knots</div>
      </div>
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
.fontSize {
  font-size: 16px;
  font-size: 55vmin;
  line-height: 1;
}

.fontSizeUnits {
  font-size: 16px;
  font-size: 5vmin;
  line-height: 1;
}
</style>
