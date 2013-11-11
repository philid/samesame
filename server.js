	
module.exports = function(config){

	var deep = require("deepjs");
	var express = require('express');
	
	var htmlMappers = require("autobahn/middleware/html");
	var staticMappers = require("autobahn/middleware/statics");
	var restful = require("autobahn/middleware/restful");

	// ______________________ MAPS

	var htmls = {
		"/":{
			page:"swig::./www/index.swig",
			context:{
				mainPath:config.mainPath || "/main"
			}
		}
	};

	
	var statics = {
		"/":[ { path:__dirname + '/www', options:{ maxAge: 86400000, redirect:false } } ],
		"/libs/deepjs":[ { path:__dirname + '/node_modules/deepjs', options : { maxAge: 86400000, redirect:false } } ],
		"/libs/deep-swig":[ { path:__dirname + '/node_modules/deep-swig', options : { maxAge: 86400000, redirect:false } } ],
		"/libs/rql":[ { path:__dirname + '/node_modules/rql', options : { maxAge: 86400000, redirect:false } } ]
	};

	var services = {
		"/experience/:id?":require("deep-mongo").create("experience", "mongodb://127.0.0.1:27017/samesame", "experience")
	};

	// ______________________ CONSTRUCT APP

	var app = express();
	app.use(express.basicAuth('admin', 'test55'));

	staticMappers.map(statics, app);

	app
	.use(htmlMappers.simpleMap(htmls))
	.use(express.bodyParser())
	.use(restful.map(services))
	.use(function(req, res, next){
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.end("error : 404");
	})
	.listen(config.port || 3000);

	console.log("server listening on port : ", config.port || 3000);


	// run all deep-core test cases
	/*
	require("deep-mongo");  // load this modules to add its units to deep.coreUnits
	require("deepjs/deep-unit").run(deep.coreUnits)
	.done(function(s){
		console.log("units executed : ", deep.coreUnits);
	});
	*/

	return app;
};
