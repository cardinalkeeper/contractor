
"use strict";

module.exports = require("cardinalkeeper").action(function(request, response) {
	
	let me = this;
	
	me.database
	
		.none("delete from document where document_id = $/document_id/", request.body)
	
		.then(() => {
			response.send({
				success: true
			});
		})
	
		.catch(error => {
			console.log("Произошла ошибка при удалении физического лица:", error);
			response.send({
				success: false
			});
		});

});