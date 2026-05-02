//Here is almost the same functions as the other ones, but I added something new to make my website cooler (I think)
'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import theatreStore from "../models/theatre-store.js";
import { v4 as uuidv4 } from 'uuid';

const region = {
  createView(request, response) {
    const regionId = request.params.id;
    logger.info(`Region page loading: ${regionId}`);

    const regionData = theatreStore.getRegionById(regionId);

    //If you dont find the page, send an error message
    if (!regionData) {
      response.status(404).send("Page not found");
      return;
    }

    // Add a highlight for THE PHANTOM OF THE OPERA
    
    //Here this funcion will loop throught every item in the production array, looking for the one located in 'london' and has the 'phantom' included in the name. Ignoring the upper cases with the funcion 'toLowerCase(). Once the 'p' (production) is found. It will highlight it
    const productions = regionData.productions.map(p => ({...p, highlight: regionId === "london" && p.title.toLowerCase().includes("phantom")}));

    const viewData = {
      title: regionData.name,
      info: appStore.getAppInfo(),
      region: regionData
    };

    response.render("region", viewData);
  },

  addProduction(request, response){
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
  },

  deleteProduction(request, response){
    const regionId = request.params.id;
    const productionId = request.params.productionid;
    theatreStore.deleteProduction(regionId, productionId);

    response.redirect('/region/' + regionId);
  },

  updateProduction(request, response){
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
  },
};

export default region;