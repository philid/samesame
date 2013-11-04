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
        range:{
            start:0,
            end:9,
            query:""
        },
        refresh : function(){
            var self = this;
            return deep.all(
                deep.get("swig::/templates/list.html"),
                deep.store("mp3").range(this.range.start, this.range.end, this.range.query)
            )
            .done(function(res){
                var template = res.shift();
                self.range = res.shift();

                var list = $("#items-list")
                .html(template(self.range));

                list.find(".item")
                .click(function(e){
                    e.preventDefault();
                    form.edit($(this).attr("item-id"));
                });

                list.find("#range-next-button")
                .click(function(e){
                    e.preventDefault();
                    if(!self.range.hasNext)
                        return;
                    self.range.start = self.range.end + 1;
                    self.range.end = self.range.start + 9;
                    self.refresh();
                });

                list.find("#range-previous-button")
                .click(function(e){
                    e.preventDefault();
                    if(!self.range.hasPrevious)
                        return;
                    self.range.end = Math.max(self.range.start - 1, 9);
                    self.range.start =  Math.max(0, self.range.end - 9);
                    self.refresh();
                });

                list.find("#search-mp3")
                .change(function(e){
                    e.preventDefault();
                    self.range.start = 0;
                    self.range.end = 9;
                    self.range.query = $(this).val();
                    self.refresh();
                });
            });
        }
    };

    var form = {
        edit : function(id)
        {
            var self = this;
            $("#form-title").html("Edit : "+id);
            return deep.get("mp3::"+id)
            .done(function(object){
                player.show(object);
                return deep.ui.toJSONBind(object, "#item-form", null, {
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
        save : function(){
            var self = this;
            return deep.ui.fromJSONBind("#item-form")
            .done(function(output){
                return deep.store("mp3")
                .put(output)
                .done(function(success){
                    console.log("object saved : ", success);
                    list.refresh();
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

    var player = {
        show:function(infos){
            return deep.get("swig::/templates/player.html")
            .done(function(template){
                infos.firefox = window.navigator.userAgent.match(/Firefox/gi);
                $("#player").html(template(infos));
                delete infos.firefox;
            })
            .fail(function (error) {
                console.log("error while loading player template : ", e.status, e.report || e);
            });
        }
    };

    return function(){
        list.refresh();
    };
});
