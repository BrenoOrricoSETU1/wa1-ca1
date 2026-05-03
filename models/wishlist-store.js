'use strict';

import JsonStore from "./json-store.js";

const wishlistStore = {
    store: new JsonStore('./models/wishlist-store.json', { wishlistCollection: [] }),
    collection: 'wishlistCollection',

    getUserWishlist(userid) {
        return this.store.findBy(this. collection, (item => item.userid === userid));
    },

    addToWishlist(item) {
        this.store.addCollection(this.collection, item);
    },

    async removeFromWishlist(itemId) {
    const items = this.store.findAll(this.collection);

    const itemToDelete = items.find(item => item.id === itemId);

    if (itemToDelete) {
        await this.store.removeCollection(this.collection, itemToDelete);
    }
    }
};

export default wishlistStore;