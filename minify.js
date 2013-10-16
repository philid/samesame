var requirejs = require('requirejs');
var fs = require('fs');

var config = {
	//appDir:".",
    baseUrl: './www/',
    name: 'main',
    out: './www/main.min.js',
    enforceDefine: false,
    wrap: true,
    paths: {
        deep:"../node_modules/deep",
        "deep-swig":"../node_modules/deep-swig",
        "deep-selector":"../node_modules/deep-selector",
        rql: "../node_modules/rql",
        "deep-ui": "./libs/deep-ui",
        "deep-jquery-ajax": "./libs/deep-jquery-ajax",
        "deep-local-storage": "./libs/deep-local-storage"
    }
};

var minify = function  () {
	requirejs.optimize(config, function (buildResponse) {
		console.log("optimisation done");
		console.log("response : ", buildResponse);
	    //buildResponse is just a text output of the modules
	    //included. Load the built file for the contents.
	    //Use config.out to get the optimized file contents.
	    var contents = fs.readFileSync(config.out, 'utf8');
	    //console.log("output : ", contents);
	}, function(err) {
		console.log("optimisation fail : ", err);
	    //optimization err callback
	});
}

minify();
