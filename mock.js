var restApi = require('./config/restapi');
var websocket = require('./config/websocket');
var listener = require('./listeners');
var bus = require('./config/events');
var port = 9000;

listener.bind();

restApi.listen(port, function(err, server){
    websocket.listen(server);
});


setInterval(function(){

    var sanitized = {
        from:'+14046677975',
        body:'turn off lamp',
        to:'+12138057574'
    }
    console.log('mock event',sanitized);
    bus.emit('sms', sanitized);
},3000);