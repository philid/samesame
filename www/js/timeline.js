if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["require", "deepjs/deep"],
function(require, deep)
{

	var timeline;
	var data;
	var options = {
		'width':  '100%',
		'height': '300px',
		'editable': true,   // enable dragging and editing events
		'style': 'box'
	};

	var getSelectedRow = function() {
        var row;
        var sel = timeline.getSelection();
        if (sel.length) {
            if (sel[0].row !== undefined) {
                row = sel[0].row;
            }
        }
        return row;
    };

    var timelineModule = {
		query:"",
        delegateEdit:function(id){

        },
        create:function() {


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
            console.log("timeline created");

        },
        refresh : function(){

			deep.store("entry").get(this.query)
			.done(function(entries){
				data = entries;
				timeline.draw(data, options);
			});
			/*
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
            ];*/

            
            //add an item for test purposes
   //          timeline.addItem({
			// 	id:5555,
			// 	'start': new Date(2010,7,30),
			// 	'content': 'vrrrrrrrrrrrrrrrrr'
			// });
        }
    };

    return timelineModule;
});



