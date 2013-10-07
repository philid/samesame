if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["require", "deep/deep"],
function(require, deep)
{
    var aspect = {
        load:deep.compose.after(function () {
            var args = Array.prototype.slice.call(arguments);
            return deep.all( 
                deep(this.externals)
                .deepLoad(this), 
                deep(this)
                .query("./renderables/["+args.join(",")+"]")
                .values(function(values){
                    return deep.utils.loadTreatments(values, self);
                })
            );
        }),
        refresh:deep.compose.after(function(){
            var self = this;
            var oldExternals = self.externals;
            return this.load.apply(this, arguments)
            .done(function(results){
                self.externals = results.shift();
                return deep.utils.applyTreatments(results.shift(), self, true);
            })
            .done(function(){
                self.externals = oldExternals;
            });
        })
    };

    return aspect;
});



