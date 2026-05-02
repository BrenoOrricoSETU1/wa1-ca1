//All functions(methods) are explained on /controllers/about.js

//This page would be the same as the DASHBOARD page, but it would not make sense leave as DASHBOARD, as it's a theatre collection (kind of)
'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import { v4 as uuidv4 } from 'uuid';


const locations = {
    createView(request, response){
        logger.info("Locations page loading.");

        const viewData = {
            title: "Locations",
            id: "locaitons",
            info: appStore.getAppInfo()
        };

        response.render("locations", viewData);
    }
};

export default locations;