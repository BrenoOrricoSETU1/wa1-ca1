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
import accounts from './controllers/accounts.js';
import wishlist from './controllers/wishlist.js';


router.get('/start', start.createView);
router.get('/locations', locations.createView);
router.get('/region/:id', region.createView);
router.get('/about', about.createView);
router.get('/region/:id/deleteproduction/:productionid', region.deleteProduction);
router.get('/stats', stats.createView);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/wishlist', wishlist.createView);
router.get('/wishlist/delete/:itemid', wishlist.delete);

router.post('/region/:id/addproduction', region.addProduction);
router.post('/region/:id/updateproduction/:productionid', region.updateProduction);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/wishlist/add', wishlist.add);

export default router;
