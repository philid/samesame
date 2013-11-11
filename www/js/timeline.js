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
			deep.store("experience").get(this.query)
			.done(function(experiences){
				data = experiences;
				data.forEach(function (experience) {
					experience.start = new Date(experience.start.valueOf());
				});
				console.log("Refreshing with data = ", data);
				timeline.draw(data, options);
			});
        },
        projection : function(){
			deep.store("experience").get(this.query)
			.done(function(experiences){
				data = [];
				var today = new Date();
				console.log("Building projection data : today =", today);
				experiences.forEach(function (experience) {
					//changing the year so it is projected after today
					if(experience.start < today.valueOf())
					{//date is before today so we have to project it (change is year)
						var startDateProjected = new Date(experience.start.valueOf());
						var startYear = startDateProjected.getFullYear();
						startDateProjected.setFullYear(today.getFullYear()+1);
						experience.start = startDateProjected.valueOf();

						if(experience.end)
						{
							var endDateProjected = new Date(experience.end.valueOf());
							var endYear = endDateProjected.getFullYear();
							if(startYear == endYear)
								endDateProjected.setFullYear(today.getFullYear()+1);
							else
								endDateProjected.setFullYear(today.getFullYear()+1+endYear-startYear);

							experience.end = endDateProjected.valueOf();}
						}
				});
				data = experiences;
				console.log("New experiences are : ", experiences);
				timeline.draw(data, options);
			});
        }
    };

    return timelineModule;
});



