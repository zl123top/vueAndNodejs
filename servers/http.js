var http=require('http') 
,fs = require('fs');
// 创建服务器
var server = http.createServer(function(req,res){
    if(req.method == 'GET' && req.url.substr(0,7)=='/images'&&req.url.substr(-4)=='.jpg'){
        fs.stat(__dirname+req.url,function(err,stat){
            if(err || !stat.isFile()){
                res.writeHead(404);
                res.end('Not Found');
                return;
            }
            serve(__dirname+req.url,'application/jpg');
        });
    }else if("GET" == req.method && '/' == req.url){
        serve(__dirname+'/index.html','text/html');
    }else{
        res.writeHead(404);
        res.end('not found');
    }
    function serve(path,type){
        res.writeHead(200,{'content-type':type});
        fs.createReadStream(path).pipe(res);
    }
});
server.listen(3000);

//改成pipe(res)
// fs.createReadStream(path)
// .on('data',function(data){
//     res.write(data);
// })
// .on('end',function(){
//     res.end();
// })