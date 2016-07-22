var addToWishlistModel = require('../models/add-to-wishlist');

module.exports = {
    addToWishlist: function(uid, data){
        addToWishlistModel.pushProductToWishlist(uid, data);
    },
    checkIfProductExistsMiddleware: function(uid, productName, callback){
        addToWishlistModel.checkIfProductExists(uid, productName, callback)
    }
}
