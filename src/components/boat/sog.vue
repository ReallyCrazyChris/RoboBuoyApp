<template>
  <div class="row">
    <div class="col-12 text-center fitFontSizeLarge">
      {{ vmc.sog }}
    </div>

    <div class="col-12 text-center fitFontSizeMedium">sog knots</div>
  </div>
</template>

<script>
import { useVmc } from "src/stores/vmc";
const vmc = useVmc();
export default {
  name: "sogView",

  setup() {
    return { vmc };
  },
};
</script>
<style>
.fitFontSizeLarge {
  font-size: 16px;
  font-size: 19vmin;
  line-height: 1;
}

.fitFontSizeMedium {
  font-size: 16px;
  font-size: 5vmin;
  line-height: 1;
}
</style>
