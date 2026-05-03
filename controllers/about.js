//forcing stricter JS rules (for example, if a have a variable it has to be declared)
'use strict';

//Importing the files to use in this class
import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import winston from "winston";
import accounts from "./accounts.js";

//the about is the JS object
const about = {
    //the createView function is to crate the page, the request (income HTTP request) and response (answer that it will send back to HTTP) 
    createView(request, response){

        const loggedInUser = accounts.getCurrentUser(request);

        if(loggedInUser){
        logger.info("About page loading.");

        const viewData = {
            title: "About",
            id: "about",
             fullname: loggedInUser.firstName + " " + loggedInUser.lastName,            
            info: appStore.getAppInfo()
        };

        response.render("about", viewData);
    } else{
        response.redirect('/');
    }
 }
};

//exporting the object, so it can be used by other files, like the routes.js
export default about;