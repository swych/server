var bus = require('../config/events');
var cache = require('memory-cache');

var ipCache = {};


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
        var ipsString = req.params.ips || null;
        var ips = (req.params.ips &&  req.params.ips.join(','))|| [];
        if(ipsString){
            ipCache[ipsString]={ips:ips,when:new Date()};
        }
        bus.emit('ping', {ips:ips.join(',')});
        res.send({hello: 'ping'});
        next();
    },
    devices:function(req,res,next){
        var devices = [];
        Object.keys(ipCache).forEach(function(key){
            var cache = ipCache[key];
            var now = new Date();
            console.log('DEVICE COMPARE',cache.when.getTime(),now.getTime());
            if(now.getTime() - cache.when.getTime() < 1000){
                devices.push(cache.ips);
            }
        });
        res.send(devices);
        next();
    },
    deviceRegister:function(req,res,next){
        console.log('device register', req.params);
        var ipsString = req.params.ips || null;
        var ips = (req.params.ips &&  req.params.ips.join(','))|| [];

        if(ipsString){
            ipCache[ipsString]={ips:ips,when:new Date()};
        }
        bus.emit('register', {ips:ips});
        res.send({hello: 'register'});
        next();
    }

}