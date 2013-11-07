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
		'height': '400px',
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
			console.log("delegateEdit function is not binded");
        },
        delegateDelete:function(id){
			console.log("delegateDelete function is not binded");
        },
        create:function() {
			var self = this;
            // Instantiate our timeline object.
            timeline = new links.Timeline(document.getElementById('mytimeline'));

            function onSelect() {
				var row = getSelectedRow();
				var item = data[row];
               console.log("Selecting object : event =", item);
               console.log("Selecting object : data =", data);
               self.delegateEdit(item.id);
            }
            function onDelete() {
				var row = getSelectedRow();
				var item = data[row];
               console.log("Selecting object : event =", item);
               console.log("Selecting object : data =", data);
               self.delegateDelete(item.id);
            }
            // attach event listeners using the links events handler
            links.events.addListener(timeline, 'select', onSelect);
            links.events.addListener(timeline, 'delete', onDelete);
        },
        refresh : function(){
			deep.store("entry").get(this.query)
			.done(function(entries){
				data = entries;
				timeline.draw(data, options);
			});
        }
    };

    return timelineModule;
});



