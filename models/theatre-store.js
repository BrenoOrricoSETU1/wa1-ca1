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
  },

  //adding production
  //Finding the correct region, go into its production array and add the new production

  //Where to look at when adding
  collecion: "regions",

  //After find it, instert the new prodcution into this array
  array: "productions",

  addProduction(id, production){
    this.store.addItem("regions", id, "productions", production);
  },

  //deleting production
  deleteProduction(regionId, productionId){
    this.store.removeItem("regions", regionId, "productions", productionId);
  },

  //updating production
  editProduction(regionId, productionId, uptadedProduction){
    this.store.editItem("regions", regionId, productionId, "productions", uptadedProduction);
  }
};

export default theatreStore;