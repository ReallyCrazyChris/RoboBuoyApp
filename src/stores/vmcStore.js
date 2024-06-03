import { defineStore } from "pinia";
import LatLon from "geodesy/latlon-spherical.js";

export const useVmcStore = defineStore("vmcStore", {
  state: () => ({
    vmc: 0,
    sog: 0,
    efficiency: 0,
    lon: 0,
    lat: 0,
    distance: 0,
    bearing: 0,
    selectedMarkId: 0,
  }),

  actions: {
    // update the VMC data using the latest GPS data
    update(lat, lon, heading, speed) {
      const p1 = new LatLon(lat, lon);
      const p2 = new LatLon(this.lat, this.lon);

      this.bearing = p1.initialBearingTo(p2);
      this.distance = Math.round(p1.distanceTo(p2));

      const deltaAngle_deg = this.bearing - heading;
      const deltaAngle_rad = (deltaAngle_deg * Math.PI) / 180.0;
      const vmc_ms = speed * Math.cos(deltaAngle_rad);

      // ms -> knots
      this.sog = Math.round(speed * 19.4384) / 10;
      this.vmc = Math.round(vmc_ms * 19.4384) / 10;

      this.efficiency = Math.round(100 * (this.vmc / this.sog)) || 0;

      console.log("vmc", this.vmc);
      console.log("efficiency", this.efficiency);
    },
    setNextCoordinates(id, lat, lon) {
      this.lon = lon;
      this.lat = lat;
      this.selectedMarkId = id;
    },
  },
});
