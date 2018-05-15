//这是一个客户端，尼玛跟浏览器似的！
var http = require('http'),
qs = require('querystring');
function send(thename){
    http.request({
        host:'127.0.0.1',
        port:3000,
        path:'/url',//不要写错了，是path不是url，坑逼
        method:'post'
    },function(res){
        var body='';
        res.setEncoding('utf8');
        res.on('data',function(chunk){
            body+=chunk;
        });
        res.on('end',function(){
            console.log('we got '+body);
            process.stdout.write('\n write your name:');
        });
    }).end(qs.stringify({name:thename}));
}
process.stdout.write('name:');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data',function(name){
    send(name.replace('\n',''));
})
