<template>
  <div class="row fit">
    <div class="col-6 fitFontSizeLarge">Efficiency</div>
    <div class="col-6 text-center fitFontSizeLarge">
      {{ vmc.efficiency }}
    </div>
    <div class="col-6"></div>
    <div class="col-6 text-center fitFontSizeMedium">%</div>
  </div>
</template>

<script>
import { useVmc } from "src/stores/vmc";
const vmc = useVmc();
export default {
  name: "efficiencyView",
  setup() {
    return { vmc };
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
