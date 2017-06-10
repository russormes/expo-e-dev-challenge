const model = require("./model");

function initView(){
	model.getSuppliers( function( err, supData ){
		if( err ){
			//Report the probelm (Obviously not in an ALERT box")
			return alert( err.message );
		}

		const selSupplier = $('#selSupplier');

		selSupplier.find('option').remove();
		$.each( supData, function( key, value ) {
			$('<option>').val( key ).text( value ).appendTo( selSupplier );
		});

		return selSupplier.change();

	} )
}

$("#selSupplier").change(
	function( e ){
		const supId = e.target.options[e.target.selectedIndex].value;
		model.getProductsBySupplier( supId, function( err, prodJson ){

			const selProduct = $('#selProduct');

			selProduct.find('option').remove();
			$.each( prodJson, function(key, value) {
				$('<option>').val( key ).text( value.product ).appendTo( selProduct );
			});

			selProduct.change();

		});

	}
);

$("#selProduct").change(

	function( e ){

		const prodId = e.target.options[e.target.selectedIndex].value;
		model.getProductById( prodId, function( err, prodJson ){

			$('#tabDetails tr').not(':first').remove();
			let html = '';
			html += '<tr><td>' + prodId +
				'</td><td>' + prodJson.supplier + '</td>' +
				'</td><td>' + prodJson.product + '</td>' +
				'</td><td>' + prodJson.price + '</td></tr>';
			$('#tabDetails tr').first().after(html);

		});

	}

);

initView();
