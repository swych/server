var restify = require('restify');
var controllers = require('./controllers');


var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.pre(restify.pre.sanitizePath());
server.get('/', controllers.ping);
server.post('/hooks/sms', controllers.sms);


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});