'use strict';

import JsonStore from "./json-store.js";

const theatreStore = {
  store: new JsonStore("./models/theatre-store.json", {
    regions: [],
    featured: []
  }),

  getAllRegions() {
    return this.store.findAll("regions");
  },

  //Getting all regions array by their respective "id" which is called "regions"
  getRegionById(id) {
    const regions = this.store.findAll("regions");
    return regions.find((region) => region.id === id);
  },

  //Getting the featured array to display on the front page
  getFeatured() {
    return this.store.findAll("featured");
  }
};

export default theatreStore;