var bus = require('./events');
var WebSocketServer = require('ws').Server;
var uuid = require('uuid');

module.exports = {
    listen: function(server,cb){


        var wss = new WebSocketServer({ server: server }),
            clients = {};

        wss.on('connection', function connection(ws) {

            var connectionId = uuid.v4();
            clients[connectionId] = ws;

            ws.on('message', function incoming(message) {
                console.log('Message from board: %s', message);
            });

            ws.on('close', function close() {
                console.log('disconnected');
                delete clients[connectionId];
            });


            bus.on('switch', function(data){
                var isOn = data.on;
                var device = data.device;
                Object.keys(clients).forEach(function(key){
                    var payload = JSON.stringify({
                        on:isOn,
                        device:device
                    });
                    clients[key].send(payload);
                });
            });
        });

        console.log('Connection will begin on next tick for localhost');

        if(cb)cb();


    }
}