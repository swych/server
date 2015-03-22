var bus = require('../config/events');

module.exports = {
    sms:function(req,res,next){
        if(!req.params)throw 'Bad request';
        var sanitized = {
            from:req.params.from,
            body:req.params.body,
            to:req.params.to
        }
        bus.emit('sms', sanitized);
        res.status(200);
        res.end();
    },
    ping:function(req,res,next){
        console.log('ping', req.params);
        res.send({hello: 'world!'});
        next();
    }
}