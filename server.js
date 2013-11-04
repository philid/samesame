	
module.exports = function(config){

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

	var mp3FolderPath = "/Users/gilles/Documents/medias/TEST_APP";

	var statics = {
		"/":[ { path:__dirname + '/www', options:{ maxAge: 86400000, redirect:false } } ],
		"/libs/deepjs":[ { path:__dirname + '/node_modules/deepjs', options : { maxAge: 86400000, redirect:false } } ],
		"/libs/deep-swig":[ { path:__dirname + '/node_modules/deep-swig', options : { maxAge: 86400000, redirect:false } } ],
		"/libs/rql":[ { path:__dirname + '/node_modules/rql', options : { maxAge: 86400000, redirect:false } } ],
		"/files":[ { path:mp3FolderPath, options : { maxAge: 86400000, redirect:false } } ]
	};

	var services = {
		"/mp3/:id?":require("deep-mp3").create("mp3", "mongodb://127.0.0.1:27017/nomocas", "mp3s")
	};

	// ______________________ CONSTRUCT APP

	var app = express();
	app.use(express.basicAuth('admin', 'test55'));
	//app.use(express.cookieParser());
	//app.use(express.cookieSession({"secret":"iuhdugzdibgijzerbigzerlbijlzerbliguriuzghmAOHRCIOHRMCUGUAH"}));

	app.use("/files", express.directory(mp3FolderPath));
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



   // rebuild mp3 table then get a range on it
	deep.store("mp3")
	.run("rebuild", [mp3FolderPath])  // SET YOUR PATH TO MP3 Folder (make a copy before. No warranty on metas integrity.)
	.done(function(success){
		console.log("\n\n************************************ list rebuilded *********************");
		console.log("******************************** "+success+" elements inserted ******************\n\n");
	})
	.done(function(success){
		deep.store("mp3").range(10,18, "meta.genre=").log();
	});



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
