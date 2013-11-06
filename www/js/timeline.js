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

        	var timeline;
        	var data;

			function getSelectedRow() {
	            var row = undefined;
	            var sel = timeline.getSelection();
	            if (sel.length) {
	                if (sel[0].row != undefined) {
	                    row = sel[0].row;
	                }
	            }
	            return row;
	        }	   

            data = [
                {
                    'start': new Date(2010,7,23),
                    'content': 'Conversation<br><img src="img/comments-icon.png" style="width:32px; height:32px;">'
                },
                {
                    id:23,
                    'start': new Date(2010,7,23,23,0,0),
                    'content': 'Mail from boss<br><img src="img/mail-icon.png" style="width:32px; height:32px;">'
                },
                {
                    'start': new Date(2010,7,24,16,0,0),
                    'content': 'Report'
                },
                {
                    'start': new Date(2010,7,26),
                    'end': new Date(2010,8,2),
                    'content': 'Traject A'
                },
                {
                    'start': new Date(2010,7,28),
                    'content': 'Memo<br><img src="img/notes-edit-icon.png" style="width:48px; height:48px;">'
                },
                {
                    'start': new Date(2010,7,29),
                    'content': 'Phone call<br><img src="img/Hardware-Mobile-Phone-icon.png" style="width:32px; height:32px;">'
                },
                {
                    'start': new Date(2010,7,31),
                    'end': new Date(2010,8,3),
                    'content': 'Traject B'
                },
                {
                    'start': new Date(2010,8,4,12,0,0),
                    'content': 'Report<br><img src="img/attachment-icon.png" style="width:32px; height:32px;">'
                }
            ];

            // specify options
            var options = {
                'width':  '100%',
                'height': '300px',
                'editable': true,   // enable dragging and editing events
                'style': 'box'
            };

            // Instantiate our timeline object.
            timeline = new links.Timeline(document.getElementById('mytimeline'));

            function onSelect() {
            	var row = getSelectedRow();
            	var item = data[row];
               console.log("Selecting object : event =", item);
               console.log("Selecting object : data =", data);
            }

            // attach an event listener using the links events handler
            links.events.addListener(timeline, 'select', onSelect);

            // Draw our timeline with the created data and options
            timeline.draw(data, options);
            timeline.addItem({
            		id:5555,
                    'start': new Date(2010,7,30),
                    'content': 'vrrrrrrrrrrrrrrrrr'
                })
	        
            // var self = this;
            // return deep.all(
            //     deep.get("swig::/templates/list.html"),
            //     deep.store("entry").get(this.query)
            // )
            // .done(function(res){
            //     var template = res.shift();
            //     var entries = res.shift();

            //     if(entries.length === 0)
            //     	form.add();

            //     var list = self.render(entries);

            //     list.find(".entry")
            //     .click(function(e){
            //         e.preventDefault();
            //         self.delegateEdit($(this).attr("item-id"));
            //     });

            //     list.find("#search")
            //     .change(function(e){
            //         e.preventDefault();
            //         self.query = $(this).val();
            //         self.refresh();
            //     });
            // });
        }
    };

    return timeline;
});



