"use strict";

import logger from "../utils/logger.js";
import theatreStore from "../models/theatre-store.js";
import accounts from "./accounts.js";
import userStore from "../models/user-store.js";

const stats = {
  createView(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);

    if(loggedInUser){

    logger.info("Stats page loading!");

    const regions = theatreStore.getAllRegions();

    const numRegions = regions.length;

    const users = userStore.getAllUsers();
    const numUsers = users.length;

    const numProductions = regions.reduce(
      (total, region) => total + region.productions.length,
      0
    );

    const average =
      numRegions > 0 ? (numProductions / numRegions).toFixed(2) : 0;
     
    //Converting nested data into single level structure
    const allProductions = regions.flatMap(region => region.productions);

    //Total rating
    let totalRating = allProductions.reduce((total, prod) => total + (parseInt(prod.rating) || 0), 0);

    //Average rating
    let avgRating = allProductions.length > 0 ? totalRating / allProductions.length : 0;

    //Highest rating
    let maxRating = Math.max(...allProductions.map(prod => prod.rating || 0));

    //Productions with highest rating
    let maxRated = allProductions.filter(prod => prod.rating === maxRating);

    //Getting titles
    let favTitles = maxRated.map(item => item.title);      

    //Highest number of productions in a region
    let maxProductions = Math.max(...regions.map(region => region.productions.length));

    //Regions with the most number of productions
    let topRegions = regions.filter(region => region.productions.length === maxProductions);

    //Getting region name
    let topRegionNames = topRegions.map(region => region.name);

    //Statistic object HERE AAAAAA do not get lost   
    const statistics = {
      displayNumRegions: numRegions,
      displayNumProductions: numProductions,
      displayAverage: average,
      displayAvgRating: avgRating.toFixed(2),
      highest: maxRating,
      displayFav: favTitles,
      maxProductions: maxProductions,
      topRegions: topRegionNames,
      displayNumUsers: numUsers,
    };

    const viewData = {
      title: "Theatre Statistics",
      stats: statistics,
      fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };

    response.render("stats", viewData);
  } else{
    response.redirect('/');
  }
 },
};

export default stats;