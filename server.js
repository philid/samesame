
module.exports = function(config){

	var express = require('express');
	var htmlMappers = require("autobahn/middleware/html");
	var staticMappers = require("autobahn/middleware/statics");

	var htmls = {
		"/":{
			page:"swig::./www/index.swig",
			context:{
				mainPath:config.mainPath || "/main",
				test:"json::./www/json/test.json"
			}
		}
	};

	var statics = {
		"/":[ { path:__dirname + '/www', options:{ maxAge: 86400000, redirect:false } } ],
		"/libs/deep":[ { path:__dirname + '/node_modules/deep', options : { maxAge: 86400000, redirect:false } } ],
		"/libs/deep-swig":[ { path:__dirname + '/node_modules/deep-swig', options : { maxAge: 86400000, redirect:false } } ],
		"/libs/deep-selector":[ { path:__dirname + '/node_modules/deep-selector', options : { maxAge: 86400000, redirect:false } } ],
		"/libs/rql":[ { path:__dirname + '/node_modules/rql', options : { maxAge: 86400000, redirect:false } } ]
	};

	var app = express();

	staticMappers.map(statics, app);

	app
	.use(htmlMappers.simpleMap(htmls))
	.use(function(req, res, next){
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.end("error : 404");
	})
	.listen(config.port || 3000);

	console.log("server listening on port : ", config.port || 3000);


	//require("deep-mongo").create("items", "mongodb://127.0.0.1:27017/test", "items2").runTests();
};
