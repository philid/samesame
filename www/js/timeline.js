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
		'cluster' : true,
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
				data.forEach(function (entry) {
					entry.start = new Date(entry.start.valueOf());
				});
				console.log("Refreshing with data = ", data);
				timeline.draw(data, options);
			});
        },
        projection : function(){
			deep.store("entry").get(this.query)
			.done(function(entries){
				data = [];
				var today = new Date();
				console.log("Building projection data : today =", today);
				entries.forEach(function (entry) {
					//changing the year so it is projected after today
					if(entry.start < today.valueOf())
					{//date is before today so we have to project it (change is year)
						var startDateProjected = new Date(entry.start.valueOf());
						var startYear = startDateProjected.getFullYear();
						startDateProjected.setFullYear(today.getFullYear()+1);
						entry.start = startDateProjected.valueOf();

						if(entry.end)
						{
							var endDateProjected = new Date(entry.end.valueOf());
							var endYear = endDateProjected.getFullYear();
							if(startYear == endYear)
								endDateProjected.setFullYear(today.getFullYear()+1);
							else
								endDateProjected.setFullYear(today.getFullYear()+1+endYear-startYear);

							entry.end = endDateProjected.valueOf();}
						}
				});
				data = entries;
				console.log("New entries are : ", entries);
				timeline.draw(data, options);
			});
        }
    };

    return timelineModule;
});



