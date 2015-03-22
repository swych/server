var bus = require('../config/events');

module.exports = {
    sms:function(req,res,next){
        if(!req.params)throw 'Bad request';
        var sanitized = {
            from:req.params.From,
            body:req.params.Body,
            to:req.params.To
        }
        console.log('REST ENDPOINT',sanitized);

        bus.emit('sms', sanitized);
        res.status(200);
        res.end();
    },
    ping:function(req,res,next){
        console.log('ping', req.params);
        res.send({hello: 'world!'});
        next();
    },
    devicePing:function(req,res,next){
        console.log('device ping', req.params);
        bus.emit('ping', {ips:req.params.ips});
        res.send({hello: 'ping'});
        next();
    },
    deviceRegister:function(req,res,next){
        console.log('device register', req.params);
        bus.emit('register', {ips:req.params.ips});
        res.send({hello: 'register'});
        next();
    }

}