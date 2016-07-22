var dbConnection = require('../config/db-connection');

module.exports = {
    removeFromWishlist: function(id, uid) {
        var wishlistQuery = 'DELETE FROM Wishlist WHERE id = "' + id + '" AND uid = "' + uid + '";';
        dbConnection.query(wishlistQuery, function(err, rows, fields) {
            if (err) throw err;
        });
    }
}
