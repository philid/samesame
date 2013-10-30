/**
 * @author Philippe Delabye <phil@chemicalrules.net>
 * @contributors Gilles Coomans <gilles.coomans@gmail.com>
THIS IS THE VIEW MAIN APP : so for browser side.
 */

define(["require" , "deepjs/deep", "deep-swig/index", "deep-jquery-ajax/lib/json", "deep-local-storage/index", "deepjs/deep-unit", "deep-data-bind/json-binder"], function(require, deep){
    
    var schema = {
        properties:{
            hello:{
                type:"string",
                description:"just a string.",
                minLength:2,
                "default":"world",
                required:true
            },
            title:{
                type:"string",
                description:"just a title.",
                required:false
            },
            obj:{
                properties:{
                    a:{ type:"number", required:true }
                }
            }
        }
    };
    // creating stores and protocoles
    //deep.store.jqueryajax.JSON.createDefault();
    deep.protocoles.swig.createDefault();
    deep.store.jstorage.Collection.create("myobjects", null, schema);

    var view = {
        refreshList : function(){
            return deep({
                template:"swig::/templates/list.html",
                context:{
                    items:"myobjects::?"
                }
            })
            .deepLoad()
            .done(function(obj){
                if(obj.context.items.length === 0)
                {
                    $("#items-list").html("");
                    return view.showForm();
                }
                $("#items-list")
                .html(obj.template(obj.context))
                .find(".item")
                .click(function(e){
                    e.preventDefault();
                    view.showForm($(this).attr("item-id"));
                });
            });
        },
        showForm : function(id)
        {
            var self = this;
            var obj = null;
            if(id)
            {
                $("#form-title").html("Edit : "+id);
                obj = "myobjects::"+id;
            }
            else
            {
                $("#form-title").html("Add");
                obj = deep.Validator.createDefault(schema);
            }
            return deep.get(obj)
            .done(function(object){
                return deep.ui.toJSONBind(object, "#item-form", schema, {
                    delegate:function(controller, property)
                    {
                        console.log("property changed : ", property);
                        if(id)
                            return self.save();
                    }
                });
            })
            .done(function(binder){
                if(!id)
                    $("<button>save</button>")
                    .appendTo("#item-form")
                    .click(function(e){
                        e.preventDefault();
                        self.save();
                    });
            });
        },
        save : function(){
            var self = this;
            return deep.ui.fromJSONBind("#item-form", schema)
            .done(function(output){
                var hasId = output.id;
                var d = deep.store("myobjects");
                if(hasId)
                    d.put(output);
                else
                    d.post(output);
                return d.done(function(success){
                    console.log("object saved : ", success);
                    if(!hasId) // we edit posted item only (puted item is already edited)
                        self.showForm(success.id);
                    self.refreshList();
                })
                .fail(function(e){
                    console.log("error while sending datas : ", e);
                });
            })
            .fail(function(e){
                console.log("error while collecting datas : ", e.status, e.report);
            });
        }
    };

    return function(){
        view.refreshList();
        $("<button>ADD</button>")
        .prependTo("#content")
        .click(function(e){
            e.preventDefault();
            view.showForm();
        });
        $("<button>Flush</button>")
        .prependTo("#content")
        .click(function(e){
            e.preventDefault();
            deep.protocoles.myobjects.flush();
            view.refreshList();
        });
    };
});
