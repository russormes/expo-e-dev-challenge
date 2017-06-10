//model.js

const MODEL = module.exports = {};

let productsInfo = {};

MODEL.getSuppliers = function( next ){
	return next( null,
		{
			"1": "New Co ltd",
			"2": "Old Co ltd"
		}
	);
};

MODEL.getProductsBySupplier = function( supId, next ){
	//Test
	if( supId === "1" ){
		productsInfo = {
			"1" : { "product": "Small wongle", "price": "5", "supplier": "New Co ltd" },
			"2" : { "product": "Large wongle", "price": "8", "supplier": "New Co ltd" },
			"3" : { "product": "Super wongle", "price": "12", "supplier": "New Co ltd" }
		};
	} else {
		productsInfo = {
			"4" : { "product": "Mini wongle", "price": "4", "supplier": "New Co ltd" },
			"5" : { "product": "Small wongle", "price": "6", "supplier": "New Co ltd" },
			"6" : { "product": "Large wongle", "price": "9", "supplier": "New Co ltd" },
			"7" : { "product": "Super wongle", "price": "13", "supplier": "New Co ltd" }
		};;
	}
	next( null, productsInfo );
}

MODEL.getProductById = function( prodId, next ){
	let prodData;
	if( productsInfo ){
		prodData = productsInfo[ prodId ];
		if( prodData ){
			return next( null, prodData );
		} else {
			return next( new Error("No product with id " + prodId ) )
		}
	} else {
		//Go get the data?
		next( new Error("Something strange happened! No product data present") );
	}
};
