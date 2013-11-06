if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["require", "deepjs/deep"],
function(require, deep)
{
    var timeline = {
    	query:"",
        delegateEdit:function(id){

        },
        render:function(entries){
            var self = this;

            $("#items-list").empty();
        	var width = $("#items-list").innerWidth();
        	var step = width/365;

        	var daysCount = {};

        	var getDOY = function(date) {
        		date = date || new Date();
				var onejan = new Date(date.getFullYear(),0,1);
				return Math.ceil((date - onejan) / 86400000);
			};

        	entries.forEach(function(e){

        		daysCount[e.date] = daysCount[e.date] || 0;
				daysCount[e.date]++;


				var date = new Date(e.date);

        		$('<div class="entry" item-id="'+e.id+'">'+e.title+'</div>')
        		.appendTo("#items-list")
        		.css("position", "absolute")
        		.css("left", step * getDOY(date))
        		.css("top", 10 + (daysCount[e.date]*25));
        	});

        	return $("#items-list");
        },
        refresh : function(){
            var self = this;
            return deep.all(
                deep.get("swig::/templates/list.html"),
                deep.store("entry").get(this.query)
            )
            .done(function(res){
                var template = res.shift();
                var entries = res.shift();

                if(entries.length === 0)
                	form.add();

                var list = self.render(entries);

                list.find(".entry")
                .click(function(e){
                    e.preventDefault();
                    self.delegateEdit($(this).attr("item-id"));
                });

                list.find("#search")
                .change(function(e){
                    e.preventDefault();
                    self.query = $(this).val();
                    self.refresh();
                });
            });
        }
    };

    return timeline;
});



