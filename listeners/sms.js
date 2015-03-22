var bus = require('../config/events');

var sms = {
    bind: function(){
        bus.on('sms', function(data){
            console.log(data);
            sms.parse(data, function(err, model){
                if(err)return bus.emit('error');
                bus.emit('switch',model);
            });
        });
    },
    parse: function(data, cb){
        // text body parse
        var body = data.body;
        var tokens = body.split(' ');
        var result = {on:false};
        tokens.forEach(function(token){
            token = token.toLowerCase();
            if(token === 'turn')return;
            else if(token === 'on')result.on = true;
            else result.device = token;
        });
        cb(null, result);
    }
}

module.exports = sms;