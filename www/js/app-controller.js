/**
 * @author Philippe Delabye <phil@chemicalrules.net>
 * @contributors Gilles Coomans <gilles.coomans@gmail.com>
THIS IS THE VIEW MAIN APP : so for browser side.
 */

if(typeof define !== 'function')
	var define = require('amdefine')(module);

define(["require" , "deep/deep", "deep-ui/plugin", "deep-swig/index", "deep-jquery-ajax/lib/json", "deep-local-storage/lib/main"], function(require){
    
    // creating stores and protocoles
    deep.store.jqueryajax.JSON.createDefault();
    deep.store.jstorage.Collection.create("myobjects");

    // setting general OCM mode
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
                "view-selector":["home"],
                externals:{
                    test:"json::/test.json"
                }
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
            /*
                // uncomment this or try this in your browser js console
                deep
                .store("myobjects")
                .post({ test:1 })
                .get()
                .log();
             */
        });
    //});
    };
});
