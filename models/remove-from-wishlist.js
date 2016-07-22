var dbConnection = require('../config/db-connection');

module.exports = {
    removeFromWishlist: function(id, uid) {
        console.log(id);
        var wishlistQuery = 'DELETE FROM Wishlist WHERE id = "' + id + '" AND uid = "' + uid + '";';
        console.log(wishlistQuery);
        dbConnection.query(wishlistQuery, function(err, rows, fields) {
            if (err) throw err;
        });
    }
}
