//Here is almost the same functions as the other ones, but I added something new to make my website cooler (I think)
'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import theatreStore from "../models/theatre-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from "./accounts.js";

const region = {
  createView(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);

    if(loggedInUser){

    const regionId = request.params.id;
    const searchTerm = request.query.searchTerm || "";
    logger.info(`Region page loading: ${regionId}`);

    //Sorting method
    const sortField = request.query.sort;
    const order = request.query.order === "desc" ? -1 : 1;

    const regionData = theatreStore.getRegionById(regionId);

    //If you dont find the page, send an error message
    if (!regionData) {
      response.status(404).send("Page not found");
      return;
    }

    
    //Search method
    let productions = searchTerm ? theatreStore.searchProductions(regionId, searchTerm) : regionData.productions;

    //Sorting method
    let sorted = productions;

    if(sortField){
      sorted = productions.slice().sort((a,b) => {
        if(sortField === "title"){
          return a.title.localeCompare(b.title) * order;
        }
        if(sortField === "rating"){
          return (a.rating - b.rating) * order;
        }

        return 0;
      });
    }

    //Keep the highlight on the Phantom
    productions = productions.map(p => ({...p, highlight:
      regionId === "london" && p.title.toLowerCase().includes("phantom")
    }));

    const viewData = {
      title: regionData.name,
      info: appStore.getAppInfo(),
      fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      isAdmin: loggedInUser.isAdmin,
      region: {
        id: regionData.id,
        name: regionData.name,
        productions: sortField ? sorted : productions
      },
      search: searchTerm,

      titleSelected: request.query.sort === "title",
      ratingSelected: request.query.sort === "rating",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
    };

    response.render("region", viewData);
   } else{
    response.redirect('/');
   }
  },

  //Only ADMIN can add/remove production
  addProduction(request, response){
    const loggedInUser = accounts.getCurrentUser(request);

    if(!loggedInUser || !loggedInUser.isAdmin){
      return response.redirect('/');
    } else{

    const regionId = request.params.id;
    const region = theatreStore.getRegionById(regionId);
    const timestamp = new Date();
    const newProduction = {
      id: uuidv4(),
      title: request.body.title,
      venue: request.body.venue,
      description: request.body.description,
      genre: request.body.genre,
      image: request.body.image,
      date: timestamp,
      rating: parseInt(request.body.rating)
    };
    theatreStore.addProduction(regionId, newProduction);
    response.redirect('/region/' + regionId);
    }
  },

  deleteProduction(request, response){
    const loggedInUser = accounts.getCurrentUser(request);

    if(!loggedInUser || !loggedInUser.isAdmin){
      return response.redirect('/');
    } else{
    const regionId = request.params.id;
    const productionId = request.params.productionid;
    theatreStore.deleteProduction(regionId, productionId);

    response.redirect('/region/' + regionId);
    }
  },

  updateProduction(request, response){
    const loggedInUser = accounts.getCurrentUser(request);

    if(!loggedInUser || !loggedInUser.isAdmin){
      return response.redirect('/');
    } else{
    console.log("Cookies:", request.cookies);
    const regionId = request.params.id;
    const productionId = request
    .params.productionid;

    const uptadedProduction = {
      id: productionId,
      title: request.body.title,
      venue: request.body.venue,
      description: request.body.description,
      genre: request.body.genre,
      image: request.body.image,
      date: request.body.date,
      rating: parseInt(request.body.rating) || 0
    };

    theatreStore.editProduction(regionId, productionId, uptadedProduction);
    response.redirect('/region/' + regionId);
  }
  },
};

export default region;