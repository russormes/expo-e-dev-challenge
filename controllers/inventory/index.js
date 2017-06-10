'use strict';
/* router.js
 * Router definition for the inventory endpoints
 *
 */

 const DB = {
	"1": {
		"1" : { "product": "Small wongle", "price": "5", "supplier": "New Co ltd" },
		"2" : { "product": "Large wongle", "price": "8", "supplier": "New Co ltd" },
		"3" : { "product": "Super wongle", "price": "12", "supplier": "New Co ltd" }
	},

	"2": {
		"4" : { "product": "Mini wongle", "price": "4", "supplier": "New Co ltd" },
		"5" : { "product": "Small wongle", "price": "6", "supplier": "New Co ltd" },
		"6" : { "product": "Large wongle", "price": "9", "supplier": "New Co ltd" },
		"7" : { "product": "Super wongle", "price": "13", "supplier": "New Co ltd" }
	}
};
const DBD = {};
DBD.getProductById = function( id, next ){

	for ( let supplier in DB ) {
		if (DB.hasOwnProperty( supplier )) {
			let prod = DB[ supplier ][ id ];
			if( prod ){ return next( null, prod ); }
		}
	}
	return next( new Error( "Product not found." ) );
}

const getSuppliers = function getSuppliers( req, res, next ){
	return res.status( 200 ).send( JSON.stringify( {
		"1": "New Co ltd",
		"2": "Old Co ltd"
	} ) );
};

const getProductsBySupplierId = function( req, res, next ){
	const supId = req.params.id;
	const prods = DB[ supId ];
	if( prods ){
		LOGGER.info( "Returned products " + JSON.stringify( prods ) );
		return res.status( 200 ).send( JSON.stringify( prods ) );
	}

	const e = new Error( "Supplier with Id " + supId + " not found" );
	LOGGER.warn( e );
	return next( e );

};

const getProductById = function( req, res, next ){
	const prodId = req.params.id;
	DBD.getProductById( prodId, function( err, prodData ){
		if( err ){
			return next( err );
		}
		if( prodData ){
			LOGGER.info( "Returned product " + JSON.stringify( prodData ) );
			return res.status( 200 ).send( JSON.stringify( prodData ) );
		} else {
			const e = new Error( "No product with id " + prodId );
			LOGGER.warn( e );
			return next( e );
		}
	});
};

module.exports = {

	"getSuppliers": getSuppliers,

	"getProductsBySupplierId": getProductsBySupplierId,

	"getProductById": getProductById

}
