import { defineStore } from "pinia";
import LatLon from "geodesy/latlon-spherical.js";
import { useMQTT } from "mqtt-vue-hook";
const mqttHook = useMQTT();

export const useVmc = defineStore("vmc", {
  state: () => ({
    lon: 0,
    lat: 0,
    distance: 0,
    bearing: 0,
    vmc: 0,
    efficiency: 0,
  }),

  actions: {
    // update the VMC data using the latest GPS data
    update(lon, lat, heading, sog) {
      const p1 = new LatLon(lat, lon);
      const p2 = new LatLon(this.lat, this.lon);

      this.bearing = p1.initialBearingTo(p2);
      this.distance = Math.round(p1.distanceTo(p2));

      // TODO normalize the angles
      const deltaAngle_deg = this.bearing - heading;
      const deltaAngle_rad = (deltaAngle_deg * Math.PI) / 180.0;

      this.vmc = Math.round(10 * sog * Math.cos(deltaAngle_rad)) / 10;
      this.efficiency = Math.round(141 * (this.vmc / sog)) || 0;

      console.log("vmc", this.vmc);
      console.log("efficiency", this.efficiency);

      if (mqttHook.isConnected) {
        mqttHook.publish(
          "vmc/1234",
          JSON.stringify({
            lon: this.lon,
            lat: this.lat,
            sog: this.sog,
            vmc: this.vmc,
            efficiency: this.efficiency,

            heading: this.heading,
          })
        );
      }
    },
    setNextCoordinates(id, lat, lon) {
      this.lon = lon;
      this.lat = lat;
      this.selectedMarkId = id;
    },
  },
});
