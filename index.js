/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */

var deep = require("deep");
deep.globals.rootPath = __dirname+"/";
require("deep-node-fs/json").createDefault();
require("deep-swig")();

var express = require('express');
var htmlMappers = require("autobahn/middleware/html");
var staticMappers = require("autobahn/middleware/statics");

var map = {
	"/":{
		page:"swig::./www/index.swig",
		context:{
			mainPath:"/js/main"
		}
	}
};

var statics = {
	"/":[ { path:__dirname + '/www', options:{ maxAge: 86400000, redirect:false } } ],
	"/libs/deep":[ { path:__dirname + '/node_modules/deep', options : { maxAge: 86400000, redirect:false } } ],
	"/libs/deep-swig":[ { path:__dirname + '/node_modules/deep-swig', options : { maxAge: 86400000, redirect:false } } ],
	"/libs/rql":[ { path:__dirname + '/node_modules/rql', options : { maxAge: 86400000, redirect:false } } ]
};

var app = express();

staticMappers.map(statics, app);

app
.use(htmlMappers.simpleMap(map))
.use(function(req, res, next){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end("error : 404");
})
.listen(3000);


