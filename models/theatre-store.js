'use strict';

import JsonStore from "./json-store.js";
import logger from "../utils/logger.js";

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

  async addProduction(regionId, production, file, response) {
    try {
      const regions = this.store.findAll("regions");
      const region = regions.find(r => r.id === regionId);

      production.image = await this.store.addToCloudinary(file);

      region.productions.push(production);

      await this.store.db.write();

      response();
    } catch (error) {
      logger.error("Error processing production:", error);
      response(error);
    }
  },

  //deleting production
  async deleteProduction(regionId, productionId) {
    const region = this.getRegionById(regionId);
    const production = region.productions.find(p => p.id === productionId);

    // Delete from courdinary
    if (production.image && production.image.public_id) {
      try {
        await this.store.deleteFromCloudinary(production.image.public_id);
        logger.info("Cloudinary image deleted");
      } catch (err) {
        logger.error("Failed to delete Cloudinary image:", err);
      }
    }

    // Remove from JSON
    this.store.removeItem("regions", regionId, "productions", productionId);
  },

  //updating production
  editProduction(regionId, productionId, uptadedProduction){
    this.store.editItem("regions", regionId, productionId, "productions", uptadedProduction);
  },

  //searching for production
  searchProductions(regionId, search){
    const region = this.getRegionById(regionId);

    if(!region) return [];

    return region.productions.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }
};

export default theatreStore;