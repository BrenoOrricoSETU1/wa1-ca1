//server.js is the starting point, the brower will check here, from here it goes to the router, then to controller, then it will have the response
'use strict';

import express from 'express';
import routes from "./routes.js";
import logger from "./utils/logger.js";
import { create } from 'express-handlebars';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false, }));
app.use(fileUpload({useTempFiles: true}));
app.use(cookieParser());

const handlebars = create({
    extname: '.hbs', 
    helpers:{
    //here
    uppercase: (intputString) => {
        return intputString.toUpperCase();
    },
    formatDate: (date) => {
        let dateCreated = new Date(date);
        let options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "2-digit",
        };
        return dateCreated.toLocaleDateString("en-GB", options);
    },
    highlightPopular: (rating) => {
        return rating >= 4 ? "Popular show!" : "";
    },  
    },
});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.use("/", routes);

app.listen(port, () => logger.info(`Your app is listening on port ${port}`));

