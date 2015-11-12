
"use strict";

module.exports = require("cardinalkeeper").resource({
	
	index: (request, response) => {
		let me = this;
		
		me.database
		
			.manyOrNone("select * from contractor_view")
			
			.then(function(data) {
				response.send({
					title: "Список контрагентов",
					success: true,
					total: data.length,
					start: 0,
					page: 1,
					data: data
				});
			})
			
			.catch(function(error) {
				response.send({
					success: false
				});
				console.error("Ошибка при запросе списка контрагентов:", error);
			});
	}
	
});