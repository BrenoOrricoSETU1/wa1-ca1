//All functions(methods) are explained on /controllers/about.js

//This page would be the same as the DASHBOARD page, but it would not make sense leave as DASHBOARD, as it's a theatre collection (kind of)
'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from "./accounts.js";


const locations = {
    createView(request, response){

        const loggedInUser = accounts.getCurrentUser(request);
        if(loggedInUser){
        logger.info("Locations page loading.");

        const viewData = {
            title: "Locations",
            id: "locaitons",
            fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
            picture: loggedInUser.picture,
            info: appStore.getAppInfo()
        };

        response.render("locations", viewData);
    } else{
        response.redirect('/');
    }
 }
};

export default locations;