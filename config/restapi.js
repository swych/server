
module.exports = {
    listen: function(port, cb){
        var restify = require('restify');
        var controllers = require('../controllers');


        var server = restify.createServer();
        server.use(restify.queryParser());
        server.use(restify.bodyParser());
        server.pre(restify.pre.sanitizePath());
        server.get('/', controllers.ping);
        server.get('/device/register', controllers.deviceRegister);
        server.get('/device/ping', controllers.devicePing);
        server.post('/hooks/sms', controllers.sms);
        server.get('/hooks/sms', controllers.sms);


        server.listen(port, function() {
            console.log('%s listening at %s', server.name, server.url);
            cb(null,server);
        });
    }
}