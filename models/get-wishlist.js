var dbConnection = require('../config/db-connection');

module.exports = {
    retrieveWishlist: function(uid, callback) {
        var wishlistQuery = 'SELECT * FROM Wishlist WHERE uid = "' + uid + '"';
        dbConnection.query(wishlistQuery, function(err, rows, fields) {
            callback(rows);
        });
    }
}
