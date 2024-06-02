import { defineStore } from "pinia";
import LatLon from "geodesy/latlon-spherical.js";

export const useVmcStore = defineStore("vmcStore", {
  state: () => ({
    vmc: 1,
    sog: 2,
    efficiency: 55,
    lon: 49.69627211119363,
    lat: 10.827493354898628,
    distance: 0,
    bearing: 0,

    selected: 1,
    lon1: 49.69627211119363,
    lat1: 10.827493354898628,
    lon2: 49.69627211119363,
    lat2: 10.827493354898628,
    lon3: 49.69627211119363,
    lat3: 10.827493354898628,
  }),

  actions: {
    // update the VMC data using the latest GPS data
    update(lat, lon, heading, speed) {
      console.log("heading", heading);
      console.log("speed", speed);

      const p2 = new LatLon(lat, lon);
      const p1 = new LatLon(this.lat, this.lon);

      this.bearing = p1.initialBearingTo(p2);
      this.distance = Math.round(p1.distanceTo(p2));

      console.log("bearing", this.bearing);

      const deltaAngle = this.bearing - heading;
      const vmc_ms = speed * Math.cos((deltaAngle * Math.PI) / 180.0);

      // ms -> knots
      this.sog = Math.round(speed * 19.4384) / 10;
      this.vmc = Math.round(vmc_ms * 19.4384) / 10;

      this.efficiency = Math.round(100 * (this.vmc / this.sog)) || 0;

      console.log("distance", this.distance);
      console.log("vmc", this.vmc);
      console.log("efficiency", this.efficiency);
    },
  },
});
