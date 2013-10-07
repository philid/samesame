/**
 * @author Philippe Delabye <phil@chemicalrules.net>
THIS IS THE VIEW MAIN APP : so for browser side.
 */

if(typeof define !== 'function')
	var define = require('amdefine')(module);

define(["require" , "deep/deep", "deep-ui/plugin", "deep-swig/index"], function(require){

    deep.generalMode("public");
    
    timeline = {
        flatten:function(){
            return deep.all(this.views.flatten(), this.gui.flatten(), this.routes.flatten());
        },
        views:deep.ocm("views.dq"),
        gui:deep.ocm("gui"),
        routes:deep.ocm("routes")
    };

    deep.store.Selector.create("views", timeline.views, "view-selector");
    
    timeline.views.up({
        "public":{
            home:{
                backgrounds:["js::/js/home-controller.js"],
                "view-selector":["home"]
            }
        },
        user:{},
        admin:{}
    });
    
    timeline.gui.up({
        "public":{
            home:function(){
                return deep("views::home").refresh();
            }
        },
        user:{

        },
        admin:{}
    });
	
    var d = timeline.flatten();
    return function(){
    //$(document).ready(function  (e) {
        d.done(function(){
            timeline.gui().home();
        });
    //});
    };
});
