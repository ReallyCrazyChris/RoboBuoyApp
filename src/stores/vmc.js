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

      var delta = this.bearing - heading;

      // normalize the angles
      delta = delta % 360;

      if (delta < 0) {
        delta += 360;
      }

      const delta_rad = (delta * Math.PI) / 180.0;

      this.vmc = Math.round(10 * sog * Math.cos(delta_rad)) / 10;

      this.efficiency = Math.round(this.vmc / sog) || 0;

      if (mqttHook.isConnected && heading != null) {
        mqttHook.publish(
          "vmc",
          JSON.stringify({
            p1lon: lon,
            p1lat: lat,
            p2lon: this.lon,
            p2lat: this.lat,
            sog: this.sog,
            vmc: this.vmc,
            efficiency: this.efficiency,
            heading: heading,
            bearing: this.bearing,
            delta: delta,
            delta_rad: delta_rad,
            distance: this.distance,
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
