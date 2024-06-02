import { defineStore } from "pinia";
import LatLon from "geodesy/latlon-spherical.js";

export const useVmcStore = defineStore("vmcStore", {
  state: () => ({
    vmc: 1,
    sog: 2,
    risk: 55,
    lon: 0,
    lat: 0,
    distance: 0,
    bearing: 0,
  }),
  actions: {
    // update the VMC data using the latest GPS data
    update(lat, lon, heading, speed) {
      const p1 = new LatLon(lat, lon);
      const p2 = new LatLon(this.lat, this.lon);

      this.bearing = p1.initialBearingTo(p2);

      const deltaAngle = this.bearing - heading;

      this.vmc = speed * Math.cos(deltaAngle);

      this.distance = p1.distanceTo(p2);

      this.risk = 100 * (1 - this.vmc / this.sog);

      console.log(this.bearing, this.heading, deltaAngle);
    },
  },
});
