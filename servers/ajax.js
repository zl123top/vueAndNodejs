// 我的第一个ajax跨域cookie,不能跨主域名
var qs=require('querystring');
require('http').createServer(function(req,res){
    if(req.url=='/src/a'){
        res.writeHead(200,{'Content-Type':'text/html','Access-Control-Allow-Origin': 'http://localhost:1988'
        ,'Access-Control-Allow-Credentials':true,'Access-Control-Allow-Headers':'Authorization,Cookie','Access-Control-Allow-Methods':'OPTIONS, GET, POST'});
        res.end(qs.stringify(req));
    }else{
        res.writeHead(404);
        res.end('not find');
    }
}).listen(3000);