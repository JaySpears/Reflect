var removeFromWishlistModel = require('../models/remove-from-wishlist');

module.exports = {
    getProductId: function(id, uid){
        removeFromWishlistModel.removeFromWishlist(id, uid);
    }
}
