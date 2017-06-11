//model.js

const MODEL = module.exports = {};

let productsInfo = {};

MODEL.getSuppliers = function( next ){
	let url = '/inventory/suppliers';
	let method = 'GET';

	$.ajax({
		"url": url,
		"method": method,
	}).done( function( response ) {
		return next( null, JSON.parse( response ) );
	}.bind( this ) ).fail( function( error ) {
		return next( error );
	});

};

MODEL.getProductsBySupplier = function( supId, next ){
	let url = '/inventory/suppliers/' + supId;
	let method = 'GET';

	$.ajax({
		"url": url,
		"method": method,
	}).done( function( response ) {
		return next( null, JSON.parse( response ) );
	}.bind( this ) ).fail( function( error ) {
		return next( error );
	});
}

MODEL.getProductById = function( prodId, next ){
	let url = '/inventory/' + prodId;
	let method = 'GET';

	$.ajax({
		"url": url,
		"method": method,
	}).done( function( response ) {
		return next( null, JSON.parse( response ) );
	}.bind( this ) ).fail( function( error ) {
		return next( error );
	});
};
