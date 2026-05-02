//Functions are explained in /controllers/about.js
'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import theatreStore from "../models/theatre-store.js";

const start = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    const viewData = {
      title: "Stage Haven",
      id: "home",
      info: appStore.getAppInfo(),
      productions: theatreStore.getFeatured()
    };
    
    response.render('start', viewData);   
  },
};

export default start;
