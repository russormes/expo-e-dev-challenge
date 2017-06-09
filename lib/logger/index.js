/* lib/logger/index.js */
'use strict';

const os = require('os');

const LOG = require( './log' );

//const s3SErrors = require( '../error' );
module.exports = class Logger {

	constructor ( mode ) {
		let quiet = process.env.NODE_QUIET || false;
		this._quiet = !( quiet === false || quiet == 'false' || quiet == '0' );

		mode = mode || "staging";
		this._modes = { "development":0,"testing":1,"staging":2,"production":3 };

		if ( typeof this._modes[ mode ] == 'undefined' )
		{
			throw new Error( mode+" is not a valid mode");
		} else {
			this._mode = mode;
		}

		this._severityArr = [ "DEBUG", "INFO", "WARN", "ERROR", "FATAL" ];
		this._severity = { "DEBUG":0, "INFO":1, "WARN":2, "ERROR":3, "FATAL":4 };
		this._spacing = {
			"development":2,
			"testing":2,
			"staging":null,
			"production":null
		};
	}

	_emitLogEntry ( severity, entry ) {
		if ( this._quiet ){ return false; }
		//var p = os.platform(); var t = os.type(); var a = os.arch();
		if ( !this._severityArr[ severity ] ){
			throw new Error("not a valid severity");
		} else {
			if ( severity === 0 && this._modes[ this._mode ] > 1 ) {
				return false;
			} else {

				let h = os.hostname(),
					r = os.release(),
					u = os.uptime(),
					l = os.loadavg(),
					timestamp = new Date().toISOString(),
					message = "",
					spacing = this._spacing[ this._mode ];

				switch ( true ) {
					case ( entry instanceof Error ):
					// case ( entry instanceof s3SErrors.s3SErrorBase ):
					// case ( entry instanceof s3SErrors.s3SStackErrorBase ):
						message = {
							"message": entry.toString(),
							"stack": entry.stack
						};

						break;
					case ( typeof entry == 'string' ):
						message = entry;

						break;
					case ( typeof entry == 'object' ):
						message = entry;

						break;
					default: message = entry.toString();

					break;
				}

				let s = this._severity, logjson;

				switch ( severity ) {
					case s.DEBUG:
						logjson = JSON.stringify({
							"timestamp": timestamp, "type": "DEBUG", "message": message
						}, null, spacing);
						return LOG.log( logjson );

					case s.INFO:
						logjson = JSON.stringify({
							"timestamp":timestamp, "type":"INFO", "message":message
						},null, spacing);
						return LOG.info( logjson );

					case s.WARN:
						logjson = JSON.stringify({
							"timestamp":timestamp, "type":"WARN", "message":message,
							"h":h, "r":r, "u":u, "l":l
						},null,spacing);
						return LOG.warn( logjson );

					case s.ERROR:
						logjson = JSON.stringify({
							"timestamp":timestamp, "type":"ERROR", "message":message,
							"h":h, "r":r, "u":u, "l":l
						},null,spacing);
						return LOG.error( logjson );

					case s.FATAL:
						logjson = JSON.stringify({
							"timestamp":timestamp, "type":"FATAL", "message":message,
							"h":h, "r":r, "u":u, "l":l
						},null,spacing);
						return LOG.error( logjson );

					//NOTE: NO default as we check for invalid severity before the switch
					//default: return false;
				}
			}
		}
	};

	debug ( msgErr ) { return this._emitLogEntry( 0, msgErr ); }

	info ( msgErr ) { return this._emitLogEntry( 1, msgErr ); }

	warn ( msgErr ) { return this._emitLogEntry( 2, msgErr ); }

	error ( msgErr ) { return this._emitLogEntry( 3, msgErr ); }

	fatal ( msgErr ) {
		// TODO: attempt an instant notification
		return this._emitLogEntry( 4, msgErr )
	};
}
