// main.js : load all first dependencies
require.config({
	baseUrl: "./libs",
    catchError:true
});
require([ "./app-controller.js"], function(app) {
	app();
});