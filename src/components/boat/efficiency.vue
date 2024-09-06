<template>
  <div class="row">
    <div class="col-12 text-center fitFontSizeLarge">
      {{ vmc.efficiency }}
    </div>

    <div class="col-12 text-center fitFontSizeMedium">vmc %</div>
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
