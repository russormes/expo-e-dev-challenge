/* test/index.js */
'use strict';

require('app-module-path').addPath(process.cwd());

const path = require( 'path' );

const Logger = require( 'lib/logger' );
process.env.NODE_ENV = "development";
global.LOGGER = new Logger( process.env.NODE_ENV );
global.PROJECT_ROOT = path.resolve( process.cwd(), 'lib' );
// global.PROJECT_ROOT = path.resolve( __dirname, "../src" );
global.PROJECT_NAME = "exp-e";
