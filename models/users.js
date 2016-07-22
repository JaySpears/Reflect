var dbConnection = require('../config/db-connection');

module.exports = {
    seeIfUserExists: function(id, callback) {
        var findUser = 'SELECT IF (EXISTS (select * from Users where uid = "' + id + '"), 1, 0) as user_exists;';
        dbConnection.query(findUser, function(err, rows, fields) {
            if (err) throw err;
            callback(rows[0].user_exists);
        });
    },
    pushToDataBase: function(id, name) {
        var addUser = 'INSERT INTO Users (uid, name) VALUES ("' + id + '","' + name + '");';
        dbConnection.query(addUser, function(err, rows, fields) {
            if (err) throw err;
        });
    }
}
