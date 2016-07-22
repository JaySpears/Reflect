var async = require('async'),
    request = require('request'),
    passport = require('passport'),
    app = require('./index').app;

/************************************************/
/*************** SHOPSYTLE ROUTES ***************/
/************************************************/

// Binding index.hbs to root. Also bind data from XHR request.
app.get('/', function(req, res) {
    var products, categories;
    async.parallel([
        function(next) {
            request('http://api.shopstyle.com/api/v2/products?fts=snapbacks&pid=uid2201-34493899-95&offset=0&limit=1000', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    products = body;
                    next(null, JSON.parse(products));
                }
            });
        },
        function(next) {
            request('http://api.shopstyle.com/api/v2/categories?pid=uid2201-34493899-95', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    categories = body;
                    next(null, JSON.parse(categories));
                }
            });
        },
    ], function(err, results) {
        res.render('index', {
            allProducts: results
        });
    });
});

// Send data to the client once a keyword is searched.
app.get('/api/:keyword', function(req, res) {
    var searchedKeyword;
    request('http://api.shopstyle.com/api/v2/products?fts=' + req.params.keyword + '&pid=uid2201-34493899-95&offset=0&limit=1000', function(error, response, body) {
        searchedKeyword = JSON.parse(body);
        res.send(searchedKeyword);
    });
});

// Retrieve data from wishlist column in DB.
app.get('/api/wishlist/get-wishlist', function(req, res) {
    var getWishlistController = require('./controllers/get-wishlist');
    var currentUserUID = req.cookies.Current_Facebook_User_id;
    function logit(s){
        res.json(s);
    }
    getWishlistController.retrieveWishlistMiddleware(currentUserUID, logit);
});

//
app.post('/api/add-wishlist', function(req, res) {
    var wishlistMiddleware = require('./controllers/add-to-wishlist');
    var currentUserUID = req.cookies.Current_Facebook_User_id;
    function doesProductExistt(bool) {
        if (bool != '1') {
            wishlistMiddleware.addToWishlist(currentUserUID, req.body);
        }
    }
    wishlistMiddleware.checkIfProductExistsMiddleware(currentUserUID ,req.body.wishListProduct, doesProductExistt);
});

app.post('/api/remove/wishlist/product', function(req, res) {
    var removeProductController = require('./controllers/remove-from-wishlist');
    var currentUserUID = req.cookies.Current_Facebook_User_id;
    removeProductController.getProductId(req.body.dude, currentUserUID);
});

/***********************************************/
/*************** FACEBOOK ROUTES ***************/
/***********************************************/

// Route for facebook authentication and login.
app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
}));

// Handle the callback after facebook has authenticated the user.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    function(req, res) {
        res.cookie('Current_Facebook_User' , res.req.user.displayName);
        res.cookie('Current_Facebook_User_id' , res.req.user.id);
        res.redirect('/');
    }
);
