/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 */

var deep = require("deep");
deep.globals.rootPath = __dirname+"/";
require("deep-node-fs/json").createDefault();
require("deep-swig").createDefault();


var argv = require('optimist')
    .usage('Launch web app. You could override any conf/*.json settings option and/or specify conf/*.json mode.\nUsage example : $0 --conf dev.json ...\nSee optimist page for more infos (https://github.com/substack/node-optimist).')
    .alias('c', 'conf')
    .describe('c', 'give settings file path')
    .argv;

var app = require("./server.js");


if(argv.conf)
	deep.get("json::./conf/"+argv.conf)
	.done(function(success){
      app(success);
	});
else
    app({
		mainPath:"/main",
		port:3000
    });
