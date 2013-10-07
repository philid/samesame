if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["require", "deep/deep"],
function(require, deep)
{
    var aspect = {

        load:deep.compose.parallele(function () {
            console.log("view aspect : load : ", this);
            if(this._externals)
                this.externals = this._externals;
            else
                this._externals = this.externals;
            return deep(this.externals).deepLoad(this, true);
        }),
        refresh:deep.compose.after(function(){
            console.log("view aspect : refresh : ", this);
            var args = Array.prototype.slice.call(arguments);
            var self = this;
            return deep(this)
            .query("./renderables/["+args.join(",")+"]")
            .values(function(values){
                return deep.utils.loadTreatments(values, self);
            })
            .done(function(treatments){
                return deep.utils.applyTreatments(treatments, self, true);
            });
        })
    };
   // deep.utils.bottom(deep.ui.ViewController, homeController);

    return aspect;
});



