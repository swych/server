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
                console.log('Message: %s', message);
            });

            ws.on('close', function close() {
                console.log('disconnected');
                delete clients[connectionId];
            });



        });
        bus.on('switch', function(data){
            var request = {command:'switch',data:data};
            var payload = JSON.stringify(request);
            console.log(payload);
            Object.keys(clients).forEach(function(key){

                clients[key].send(payload);
            });
        });

        console.log('Connection will begin on next tick for localhost');

        if(cb)cb();


    }
}