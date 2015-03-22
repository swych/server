var restApi = require('./config/restapi');
var websocket = require('./config/websocket');
var listener = require('./listeners');
var bus = require('./config/events');
var port = 8080;

listener.bind();

restApi.listen(port, function(err, server){
    websocket.listen(server);
});


setInterval(function(){
    console.log('mock event');

    var sanitized = {
        from:'+14046677975',
        body:'turn off coffee',
        to:'+12138057574'
    }
    bus.emit('sms', sanitized);
},3000);