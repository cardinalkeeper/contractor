
"use strict";

module.exports = require("cardinalkeeper").action(function(request, response) {
	
	let me = this;
	
	let offset = Number(request.query.start || 0);
	let limit = Number(request.query.limit || 25);
	
	let sql = {
		count: `select count(*) as total from individual_view`,
		select: `select * from individual_view offset ${offset} limit ${limit}`
	};
	
	me.database
	
		.one(sql.count)
		
		.then(function(data) {
			let total = Number(data.total);
			let promise = me.database
				.manyOrNone(sql.select)
				.then(function(data) {
					response.send({
						success: true,
						start: offset,
						limit: limit,
						total: total,
						data: data
					});
				});
			return promise;
		})
		
		.catch(function(error) {
			console.error("Ошибка при запросе списка физических лиц:", error);
			response.send({
				success: false,
				message: "Ошибка при запросе списка физических лиц",
				error: error
			});
		});

});