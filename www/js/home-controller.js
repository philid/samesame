if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["require", "deepjs/deep", "./view-aspect.js"],
function(require, deep)
{
    var homeController = {
        backgrounds:["js::/js/view-aspect.js"],
        deepLinkPath:"/home",
        externals:{
        },
        renderables:{
            self:{
                how:"swig::./templates/home.html",
                where:"dom.htmlOf::#content",
                done:function (nodes) {
                    console.log("Home rendered()");
              
                }
            }
        }
    };

    return homeController;
});



