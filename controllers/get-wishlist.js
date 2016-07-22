var getWishlistModel = require('../models/get-wishlist');

module.exports = {
    retrieveWishlistMiddleware: function(uid, callback){
        var currentFacebookUserID = uid;
        function testing(x){
            callback(x);
        }
        getWishlistModel.retrieveWishlist(currentFacebookUserID, testing);
    }
}
