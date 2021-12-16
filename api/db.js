const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "mariadb",
  user: "my_user",
  password: "ROOT",
  database: "car_db",
});

module.exports = {
  getConnection: function () {
    return new Promise(function (resolve, reject) {
      pool
        .getConnection()
        .then(function (connection) {
          resolve(connection);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};
