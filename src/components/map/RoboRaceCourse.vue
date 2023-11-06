<template>
  <ol-image-layer id="xkcd">
    <ol-source-image-static
      :url="imgUrl"
      :imageSize="size"
      :imageExtent="mapStore.extent"
      :projection="mapStore.projection"
      :attributions="imgCopyright"
    ></ol-source-image-static>
  </ol-image-layer>
  <ol-interaction-transform> </ol-interaction-transform>
</template>

<script>
import { defineComponent } from "vue";
import { useRoboStore } from "stores/roboStore";
import { useMapStore } from "stores/mapStore";

export default defineComponent({
  name: "RoboRaceCourse",
  props: ["deviceid"],
  components: {},
  setup(props) {
    const roboStore = useRoboStore(props.deviceid);
    const mapStore = useMapStore();

    return { roboStore, mapStore };
  },
  data() {
    return {
      size: [1024, 768],
      center: [1024 / 2, 768 / 2],
      extent: [0, 0, 1024, 768],
      imgUrl: "https://imgs.xkcd.com/comics/online_communities.png",
      imgCopyright: '© <a href="http://xkcd.com/license.html">xkcd</a>',
      projection: {
        code: "xkcd-image",
        units: "pixels",
        extent: [0, 0, 1024, 768],
      },
    };
  },
});
</script>
