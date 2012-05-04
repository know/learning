define(function() {
    
    var Exceptions = {
        
        LootException: new Class({
            initialize: function(message) {
                this.message = message;
            }
        })
    };
    
    return Exceptions;
});