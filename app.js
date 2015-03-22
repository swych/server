var restApi = require('./config/restapi');
var websocket = require('./config/websocket');
var port = 8080;

restApi.listen(port, function(err, server){
    websocket.listen(server);
});