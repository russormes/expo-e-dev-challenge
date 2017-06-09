/* test/lib/logger/index.js */
'use strict';

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const proxyquire = require('proxyquire');

const _mockLog = function( msg ) {
	try {
		return JSON.parse( msg );
	} catch (e){
		return false;
	}
};
const Logger = proxyquire('lib/logger', {
	"./log": {

		log: _mockLog,

		warn: _mockLog,

		info: _mockLog,

		error: _mockLog

	}
} );

const quiet = process.env.NODE_QUIET;

describe("Logger",function() {

	before(function(){
		process.env.NODE_QUIET=false;
	});
	/*
	after(function(){
		process.env.NODE_QUIET=quiet;
	});
	*/

	describe("#constructor", function(){
		it("should throw Error when passed invalid mode", function(){
			let fn = function () { let logger = new Logger("fakemode"); };
			expect(fn).to.throw(/not a valid mode/);
		});
	});

	describe("#_emitLogEntry", function() {
		let msgAsObject;

		it("should throw an Error when passed invalid severity", function(){
			let fn = function () {
				let logger = new Logger();
				logger._emitLogEntry(999,new Error());
			}
			expect(fn).to.throw(/not a valid severity/);
		});

		it("should return false (not log) if process.env.NODE_QUIET is not one of \"false\"|false|0 ", function(){
			process.env.NODE_QUIET = "hello";
			let logger = new Logger();
			msgAsObject = logger._emitLogEntry( 4, new Error() );
			assert.isFalse( msgAsObject, "_emitLogEntry returns false" );
			msgAsObject = logger._emitLogEntry( 3, new Error() );
			assert.isFalse( msgAsObject, "_emitLogEntry returns false" );
			msgAsObject = logger._emitLogEntry( 2, new Error() );
			assert.isFalse( msgAsObject, "_emitLogEntry returns false" );
			msgAsObject = logger._emitLogEntry( 1, new Error() );
			assert.isFalse( msgAsObject, "_emitLogEntry returns false" );
			process.env.NODE_QUIET = "false";
		});

		it("should log if process.env.NODE_QUIET is one of \"false\"|false|0 ", function(){
			process.env.NODE_QUIET = "false";
			let logger = new Logger("development");
			msgAsObject = logger._emitLogEntry( 4, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			msgAsObject = logger._emitLogEntry( 3, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			msgAsObject = logger._emitLogEntry( 2, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			msgAsObject = logger._emitLogEntry( 1, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );

			process.env.NODE_QUIET = false;
			logger = new Logger("development");
			msgAsObject = logger._emitLogEntry( 4, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			msgAsObject = logger._emitLogEntry( 3, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			msgAsObject = logger._emitLogEntry( 2, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			msgAsObject = logger._emitLogEntry( 1, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );

			process.env.NODE_QUIET = 0;
			logger = new Logger("development");
			msgAsObject = logger._emitLogEntry( 4, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			msgAsObject = logger._emitLogEntry( 3, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			msgAsObject = logger._emitLogEntry( 2, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			msgAsObject = logger._emitLogEntry( 1, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );

		});

		it("should emit pretty JSON type:FATAL to the console when passed an Error with constant 4", function(){
			let logger = new Logger();
			msgAsObject = logger._emitLogEntry( 4, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			assert.equal( msgAsObject.type, "FATAL", "Log type is FATAL" );
		});

		it("should emit pretty JSON type:ERROR to the console when passed an Error with constant 3", function(){
			let logger = new Logger();
			msgAsObject = logger._emitLogEntry( 3, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			assert.equal( msgAsObject.type, "ERROR", "Log type is ERROR" );
		});

		it("should emit pretty JSON type:WARN to the console when passed an Error with constant 2", function(){
			let logger = new Logger();
			msgAsObject = logger._emitLogEntry( 2, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			assert.equal( msgAsObject.type, "WARN", "Log type is WARN" );
		});

		it("should emit pretty JSON type:INFO to the console when passed an Error with constant 1", function(){
			let logger = new Logger();
			msgAsObject = logger._emitLogEntry( 1, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			assert.equal( msgAsObject.type, "INFO", "Log type is INFO" );
		});

		it("should emit pretty JSON type:DEBUG to the console when passed an Error with constant 0", function(){
			let logger = new Logger("development");
			msgAsObject = logger._emitLogEntry( 0, new Error() );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			assert.equal( msgAsObject.type, "DEBUG", "Log type is DEBUG" );
		});

		it("should log messages passed as strings", function(){
			let logger = new Logger();
			msgAsObject = logger._emitLogEntry( 1, "message" );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			assert.equal( msgAsObject.type, "INFO", "Log type is INFO" );

		});

		it("should log messages passed as objects", function(){
			let logger = new Logger();
			msgAsObject = logger._emitLogEntry( 1, { "message": "hello" } );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			assert.equal( msgAsObject.type, "INFO", "Log type is INFO" );

		});

		it("should log messages passed as literals", function(){
			let logger = new Logger();
			msgAsObject = logger._emitLogEntry( 1, true );
			assert.isObject( msgAsObject, "msg is valid JSON" );
			assert.equal( msgAsObject.type, "INFO", "Log type is INFO" );

		});

	});

	describe("#debug", function(){
		let logAsObj;

		it("should not make a debug log if the logger is instantiated with mode \"staging\" or \"production\"", function(){

				let logger = new Logger("staging");
				logAsObj = logger.debug( "test debug" );
				assert.isFalse( logAsObj, "logger returns false" );

				logger = new Logger("production");
				logAsObj = logger.debug( "test debug" );
				assert.isFalse( logAsObj, "logger returns false" );
		});

		it("should make a debug log if the logger is instantiated with mode \"development\" or \"testing\"", function(){

				let logger = new Logger("development");
				logAsObj = logger.debug( "dev debug" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "DEBUG", "Log type is DEBUG" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "dev debug" );

				logger = new Logger("testing");
				logAsObj = logger.debug( "test debug" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "DEBUG", "Log type is DEBUG" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "test debug" );

		});
	});

	describe("#info", function(){
		let logAsObj;

		it("should make a info log to console in all logging modes", function(){

				let logger = new Logger("development");
				logAsObj = logger.info( "dev info log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "INFO", "Log type is INFO" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "dev info log" );

				logger = new Logger("testing");
				logAsObj = logger.info( "test info log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "INFO", "Log type is INFO" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "test info log" );

				logger = new Logger("staging");
				logAsObj = logger.info( "staging info log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "INFO", "Log type is INFO" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "staging info log" );

				logger = new Logger("production");
				logAsObj = logger.info( "production info log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "INFO", "Log type is INFO" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "production info log" );

		});
	});

	describe("#warn", function(){
		let logAsObj;

		it("should make a warn log to console in all logging modes", function(){

				let logger = new Logger("development");
				logAsObj = logger.warn( "dev warn log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "WARN", "Log type is WARN" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "dev warn log" );

				logger = new Logger("testing");
				logAsObj = logger.warn( "test warn log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "WARN", "Log type is WARN" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "test warn log" );

				logger = new Logger("staging");
				logAsObj = logger.warn( "staging warn log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "WARN", "Log type is WARN" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "staging warn log" );

				logger = new Logger("production");
				logAsObj = logger.warn( "production warn log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "WARN", "Log type is WARN" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "production warn log" );

		});
	});


	describe("#error", function(){
		let logAsObj;

		it("should make a error log to console in all logging modes", function(){

				let logger = new Logger("development");
				logAsObj = logger.error( "dev error log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "ERROR", "Log type is ERROR" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "dev error log" );

				logger = new Logger("testing");
				logAsObj = logger.error( "test error log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "ERROR", "Log type is ERROR" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "test error log" );

				logger = new Logger("staging");
				logAsObj = logger.error( "staging error log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "ERROR", "Log type is ERROR" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "staging error log" );

				logger = new Logger("production");
				logAsObj = logger.error( "production error log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "ERROR", "Log type is ERROR" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "production error log" );
			});
		});

	describe("#fatal", function(){
		let logAsObj;

		it("should make a fatal log to console in all logging modes", function(){

				let logger = new Logger("development");
				logAsObj = logger.fatal( "dev fatal log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "FATAL", "Log type is FATAL" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "dev fatal log" );

				logger = new Logger("testing");
				logAsObj = logger.fatal( "test fatal log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "FATAL", "Log type is FATAL" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "test fatal log" );

				logger = new Logger("staging");
				logAsObj = logger.fatal( "staging fatal log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "FATAL", "Log type is FATAL" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "staging fatal log" );

				logger = new Logger("production");
				logAsObj = logger.fatal( "production fatal log" );
				assert.isObject( logAsObj, "msg is valid JSON" );
				assert.equal( logAsObj.type, "FATAL", "Log type is FATAL" );

				expect( logAsObj ).to.include.keys('message');
				expect( logAsObj.message ).to.contain( "production fatal log" );
			});
		});

});
