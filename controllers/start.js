//Functions are explained in /controllers/about.js
'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import theatreStore from "../models/theatre-store.js";
import accounts from "./accounts.js";

const start = {
  createView(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);

    if(loggedInUser){
    logger.info("Start page loading!");
    
    const viewData = {
      title: "Stage Haven",
      id: "home",
      info: appStore.getAppInfo(),
      fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      productions: theatreStore.getFeatured()
    };
    
    response.render('start', viewData);   
  } else{
    response.redirect('/');
  }
  },
};

export default start;
