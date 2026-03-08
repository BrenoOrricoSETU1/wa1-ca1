//Here is almost the same functions as the other ones, but I added something new to make my website cooler (I think)
'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import theatreStore from "../models/theatre-store.js";

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
      id: "locations",
      info: appStore.getAppInfo(),
      regionName: regionData.name,
      productions: productions
    };

    response.render("region", viewData);
  }
};

export default region;