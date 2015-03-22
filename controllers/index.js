module.exports = {
    sms:function(req,res,next){
        console.log(req.params,req.body);
        res.send({good:'job'});
    },
    ping:function(req,res,next){
        res.send({hello: 'world!'});
        next();
    }
}