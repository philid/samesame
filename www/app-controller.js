/**
 * @author Philippe Delabye <phil@chemicalrules.net>
 * @contributors Gilles Coomans <gilles.coomans@gmail.com>
THIS IS THE VIEW MAIN APP : so for browser side.
 */

define(["require" , "deepjs/deep", "deep-swig/index", "deep-jquery-ajax/lib/json", "deep-local-storage/index", "deepjs/deep-unit", "deep-data-bind/json-binder"], function(require, deep){
    
    // creating stores and protocoles
    deep.store.jqueryajax.JSON.create("mp3", "/mp3/");
    deep.protocoles.swig.createDefault();

    var list = {
        search:"",
        range:{
            start:0,
            end:10
        },
        refreshList : function(){
            var self = this;
            return deep.all(
                deep({
                    template:"swig::/templates/list.html",
                    context:{
                    }
                })
                .deepLoad(),
                deep.store("mp3").range(this.range.start, this.range.end, this.search)
            )
            .done(function(res){
                var obj = res.shift();
                self.range = res.shift();
                obj.context.items = self.range.results;
                obj.context.search = self.search;
                if(obj.context.items.length === 0)
                {
                    $("#items-list").html("");
                    return;
                }
                var list = $("#items-list")
                .html(obj.template(obj.context));

                list.find(".item")
                .click(function(e){
                    e.preventDefault();
                    form.show($(this).attr("item-id"));
                });

                list.find("#range-next-button")
                .click(function(e){
                    e.preventDefault();
                    if(!self.range.hasNext)
                        return;
                    self.range.start = self.range.end + 1;
                    self.range.end = self.range.start + 10;
                    self.refreshList();
                });

                list.find("#range-previous-button")
                .click(function(e){
                    e.preventDefault();
                    if(!self.range.hasPrevious)
                        return;
                    self.range.end = Math.max(self.range.start - 1, 10);
                    self.range.start =  Math.max(0, self.range.end - 10);
                    self.refreshList();
                });

                list.find("#search-mp3")
                .change(function(e){
                    e.preventDefault();
                    console.log("input changed : ", $(this).val());
                    self.search = $(this).val();
                    self.refreshList();
                });
            });
        }
    };

    var form = {
        show : function(id)
        {
            var self = this;
            $("#form-title").html("Edit : "+id);
            return deep.get("mp3::"+id)
            .done(function(object){
                return deep.ui.toJSONBind(object, "#item-form", null, {
                    delegate:function(controller, property)
                    {
                        console.log("property changed : ", property);
                        return self.save();
                    }
                });
            });
        },
        save : function(){
            var self = this;
            return deep.ui.fromJSONBind("#item-form")
            .done(function(output){
                return deep.store("mp3")
                .put(output)
                .done(function(success){
                    console.log("object saved : ", success);
                    if(!hasId) // we edit posted item only (puted item is already edited)
                        self.show(success.id);
                    list.refreshList();
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
        list.refreshList();
    };
});
