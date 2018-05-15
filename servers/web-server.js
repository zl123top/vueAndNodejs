// 我的第一个表单提交并返回name值
var qs=require('querystring');
require('http').createServer(function(req,res){
    if(req.url=='/'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end([
            '<form method="post" action="/url">'
            ,'<h1>my form</h1>'
            ,'<input type="text" name="name">'
            ,'<button>submit</button>'
            ,'</form>'
        ].join(''));
    }else if(req.url=='/url' && req.method=='POST'){
        var body='';
        req.on('data',function(chunk){
            body+=chunk;
        });
        req.on('end',function(){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end('end '+qs.parse(body).name);
        });
        
    }else{
        res.writeHead(404);
        res.end('not find');
    }
}).listen(3000);