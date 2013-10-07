// main.js : load all first dependencies
require.config({
	baseUrl: "./libs",
    catchError:true
});
require([ "/js/app-controller.js"], function(app) {
	app();
});