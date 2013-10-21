/**
 * @author Philippe Delabye <phil@chemicalrules.net>
 * @contributors Gilles Coomans <gilles.coomans@gmail.com>
THIS IS THE VIEW MAIN APP : so for browser side.
 */

define(["require" , "deep/deep", "deep-swig/index", "deep-jquery-ajax/lib/json", "deep-local-storage/index", "deep/deep-unit", "deep-data-bind/json-binder"], function(require, deep){
    
    // creating stores and protocoles
    //deep.store.jqueryajax.JSON.createDefault();
    deep.protocoles.swig.createDefault();
    deep.store.jstorage.Collection.create("myobjects");


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
            var obj = null;
            if(id)
            {
                $("#form-title").html("Edit : "+id);
                obj = "myobjects::"+id;
            }
            else
            {
                $("#form-title").html("Add");
                obj = { hello:"world", title:"My title." };
            }
            return deep(obj)
            .done(function(object){
                return deep.ui.toJSONBind(object, "#item-form");
            })
            .done(function(binder){
                $("<button>save</button>")
                .appendTo("#item-form")
                .click(function(e){
                    e.preventDefault();
                    var output = deep.ui.fromJSONBind("#item-form");
                    var d = deep.store("myobjects");
                    if(id)
                        d.put(output);
                    else
                        d.post(output);
                    d.done(function(success){
                        view.refreshList();
                    });
                });
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
