var getWishlistModel = require('../models/get-wishlist');

module.exports = {
    retrieveWishlistMiddleware: function(uid, callback){
        var currentFacebookUserID = uid;
        function retrieveWishlistData(x){
            callback(x);
        }
        getWishlistModel.retrieveWishlist(currentFacebookUserID, retrieveWishlistData);
    }
}
