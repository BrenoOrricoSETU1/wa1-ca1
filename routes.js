//Here it was pre made did not change much. The router.js is to connect the URLs to pages, functions...
'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below
import start from './controllers/start.js';
import locations from "./controllers/locations.js";
import region from "./controllers/region.js";
import about from "./controllers/about.js";
import stats from "./controllers/stats.js";


router.get('/', start.createView);
router.get('/locations', locations.createView);
router.get('/region/:id', region.createView);
router.get('/about', about.createView);
router.get('/region/:id/deleteproduction/:productionid', region.deleteProduction);
router.get('/stats', stats.createView);


router.post('/region/:id/addproduction', region.addProduction);
router.post('/region/:id/updateproduction/:productionid', region.updateProduction);

export default router;
