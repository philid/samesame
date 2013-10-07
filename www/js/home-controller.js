if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["require", "deep/deep", "/js/view-aspect.js"],
function(require, deep)
{
    var homeController = {

        deepLinkPath:"/home",
        externals:{
        },
        renderables:{
            self:{
                how:"swig::./templates/home.html",
                where:"dom.htmlOf::#content",
                done:function (nodes) {
                    console.log("Home rendered() : ");
              
                }
            }
        }
    };

    var aspect = require("/js/view-aspect.js");
    deep.utils.up(aspect, homeController);
    return homeController;
});



