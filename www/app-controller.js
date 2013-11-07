/**
 * @author Philippe Delabye <phil@chemicalrules.net>
 * @contributors Gilles Coomans <gilles.coomans@gmail.com>
THIS IS THE VIEW MAIN APP : so for browser side.
 */

define(["require" , "deepjs/deep", "deep-swig/index", "deep-jquery-ajax/lib/json", "deep-local-storage/index", "deepjs/deep-unit", "deep-data-bind/json-binder", "./js/timeline.js"], function(require, deep){
    
    // creating stores and protocoles
    deep.store.jqueryajax.JSON.create("entry", "/entry/");
    deep.protocoles.swig.createDefault();


    var timeline = require( "./js/timeline.js");

    var entrySchema = {
		properties:{
			start:{ type:"number", description:"a start date for your entry.", "default":new Date().valueOf()},
			end:{ type:"number", description:"a end date for your entry.", required:false},
			content:{ type:"string", description:"the html of the entry", "default":"Html content here"}
		}
    };


    timeline.delegateEdit = function(id){
		form.edit(id);
    };
    timeline.delegateDelete = function(id){
		console.log("Deleting item with id : ", id);
		deep.store("entry")
		.del(id)
        .done(function(object){
            console.log("delete done !!! : ", object);
        })
        .fail(function(e){
            console.log("error while retrieving datas : ", e.status, e.report || e);
        });
    };
    

    var form = {
		add : function(id)
        {
            var self = this;
            $("#form-title").html("Add entry ");
            return deep.ui.toJSONBind(deep.Validator.createDefault(entrySchema), "#item-form", entrySchema)
            .done(function(binder){
				$('<button>save</button>')
				.appendTo("#item-form")
				.click(function(e){
					e.preventDefault();
					self.save(true);
				});
			});
        },
        edit : function(id)
        {
            var self = this;
            $("#form-title").html("Edit : "+id);
            return deep.get("entry::"+id)
            .done(function(object){
                return deep.ui.toJSONBind(object, "#item-form", entrySchema, {
                    delegate:function(controller, property)
                    {
                        return self.save();
                    }
                });
            })
            .fail(function(e){
                console.log("error while retrieving datas : ", e.status, e.report || e);
            });
        },
        save : function(post){
            var self = this;
            return deep.ui.fromJSONBind("#item-form", entrySchema)
            .done(function(output){
                var d = deep.store("entry");
                if(post)
					d.post(output);
                else
					d.put(output);
                d.done(function(success){
                    console.log("object saved : ", success);
                    timeline.refresh();
                })
                .fail(function(e){
                    console.log("error while sending datas : ", e);
                });
            })
            .fail(function(e){
                console.log("error while collecting datas : ", e.status, e.report || e);
            });
        }
    };

    return function(){
        timeline.create();
        timeline.refresh();
        $('#addbutton')
		.click(function(e){
			e.preventDefault();
			form.add();
		});
    };
});
