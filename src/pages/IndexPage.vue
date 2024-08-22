<template>
  <q-page>
    <div class="" style="height: 100%; min-height: 100%">
      <div class="column">
        <div class="column">
          <div class="col col-xs-12 col-md-6 col-lg-3 fontFit" align="center">
            1
          </div>
          <div class="col-xs-12 col-md-6 col-lg-3 fontFit" align="center">
            2
          </div>
          <div class="col-xs-12 col-md-6 col-lg-3 fontFit" align="center">
            3
          </div>
          <div class="col-xs-12 col-md-6 col-lg-3 fontFit" align="center">
            4
          </div>
        </div>
        <div></div>
      </div>
      <div class="col visible">
        <div class="" align="center">3</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>

<style>
.visible {
  border: 1px solid rgb(234, 9, 9);
}

.fontFit {
  border: 1px solid rgb(241, 238, 238);
  font-size: 16px;
  font-size: 20vmin;
}
</style>
