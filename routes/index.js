'use strict';

/* routes/index.js
 * Index file for importing the api router definitions
 * */

module.exports = function registerRouters( app ) {

	app.use( '/inventory', require('./inventory.router') );

};
