var bus = require('../config/events');
var _ = require('lodash');

var sms = {
    bind: function(){
        bus.on('sms', function(data){
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
        var result = _.cloneDeep(data);

        tokens.forEach(function(token){
            token = token.toLowerCase();
            if(token === 'turn')return;
            else if(token === 'on')result.action = 'on';
            else if(token === 'off')result.action = 'off';
            else result.device = token;
        });
        cb(null, result);
    }
}

module.exports = sms;