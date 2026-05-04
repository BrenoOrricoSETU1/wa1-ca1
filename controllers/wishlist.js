'use strict';

import logger from '../utils/logger.js'
import accounts from './accounts.js';
import wishlistStore from '../models/wishlist-store.js';
import { v4 as uuidv4 } from 'uuid';

const wishlist = {
    createView(request, response) {
        logger.info("Wishlist page loading");
        const loggedInUser = accounts.getCurrentUser(request);

        if (loggedInUser) {
            const items = wishlistStore.getUserWishlist(loggedInUser.id);

            const viewData = {
                title: "Your Wishlist",
                fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
                picture: loggedInUser.picture,
                wishlist: items
            };
            response.render('wishlist', viewData);
        } else{
            response.redirect('/');
        }
    },

    add(request, response){
        const loggedInUser = accounts.getCurrentUser(request);

        const newItem = {
            userid: loggedInUser.id,
            id: uuidv4(),
            title: request.body.title,
            image: request.body.image,
            venue: request.body.venue,
            rating: parseInt(request.body.rating) || 0
        };
        wishlistStore.addToWishlist(newItem);
        response.redirect('/wishlist');
    },

    async delete(request, response){
    const itemId = request.params.itemid;

    await wishlistStore.removeFromWishlist(itemId);

    response.redirect('/wishlist');
    }
};

export default wishlist;