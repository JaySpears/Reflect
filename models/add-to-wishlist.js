var dbConnection = require('../config/db-connection');

module.exports = {
    checkIfProductExists: function(uid, productName, callback){
        var findProduct = 'SELECT IF (EXISTS (select * from Wishlist where product_title = "' + productName + '" AND uid = "' + uid + '"), 1, 0) as product_exists;';
        dbConnection.query(findProduct, function(err, rows, fields) {
            if (err) throw err;
            callback(rows[0].product_exists);
        });
    },
    pushProductToWishlist: function(uid, wishlistData) {
        var addToWishlist = 'INSERT INTO Wishlist (uid, product_title, product_price, product_image_src, product_url) VALUES ("' + uid + '","' + wishlistData.wishListProduct + '","' + wishlistData.wishListProductPrice + '","' + wishlistData.wishListImage + '","' + wishlistData.wishListProductUrl + '");';
        dbConnection.query(addToWishlist, function(err, rows, fields) {
            if (err) throw err;
        });
    }
}
