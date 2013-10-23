/**
 * @author Philippe Delabye <phil@chemicalrules.net>
 * @contributors Gilles Coomans <gilles.coomans@gmail.com>
THIS IS THE VIEW MAIN APP : so for browser side.
 */

define(["require" , "deep/deep", "deep-swig/index", "deep-jquery-ajax/lib/json", "deep-local-storage/index", "deep/deep-unit", "deep-data-bind/json-binder"], function(require, deep){
    
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
                obj = { hello:"", title:"", obj:{ a:1 } };
            }
            return deep.get(obj)
            .done(function(object){
                return deep.ui.toJSONBind(object, "#item-form", schema, {
                    delegate:function(controller, property)
                    {
                        if(!id)
                            return;
                        return self.save();
                    }
                });
            })
            .done(function(binder){
                $("<button>save</button>")
                .appendTo("#item-form")
                .click(function(e){
                    e.preventDefault();
                    self.save();
                });
            });
        },
        save : function(){
            var output = deep.ui.fromJSONBind("#item-form", schema);
            console.log("saving : ", output);
            deep.when(output)
            .done(function(output){
                var hasId = output.id;
                //console.log("app-controller : output getted :  ", output);
                var d = deep.store("myobjects");
                if(hasId)
                    d.put(output);
                else
                    d.post(output);
                d.done(function(success){
                    console.log("send datas success : ", success);
                    if(!hasId) // we edit posted item only (puted item is already edited)
                        view.showForm(success.id);
                    view.refreshList();
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
