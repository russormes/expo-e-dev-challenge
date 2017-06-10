const path = require('path');
const addPath = require('app-module-path').addPath;
addPath( __dirname );
addPath( path.resolve(__dirname, './lib') );

const Logger = require('logger');
global.LOGGER = new Logger( process.env.NODE_ENV );

const express = require('express')
const app = express()

app.use(express.static('public'));

//Register routes
require('./routes')( app );

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
