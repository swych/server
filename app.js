var restApi = require('./config/restapi');
var websocket = require('./config/websocket');
var listener = require('./listeners');
var port = 8080;

listener.bind();

restApi.listen(port, function(err, server){
    websocket.listen(server);
});