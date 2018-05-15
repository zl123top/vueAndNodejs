//一个简单的TCP服务端聊天，客户端用telnet
var net = require('net');

var count=0
,users={};
var server = net.createServer(function(conn){
    var nickname;
    console.log('\033[90m new connection \033[39m');
    conn.setEncoding('utf8');
    count++;
    conn.write('');
    conn.on('data',function(data){
        data=data.replace(/[\r\n]/g,'');
        if(!nickname){
            if(users[data]){
                conn.write('\033[93m>nickname already in use.try again:\033[39m\n\r');
                return;
            }else{
                nickname=data;
                users[nickname]=conn;
                broadcast('\033[90m> '+'how many:'+count+nickname+'joined the room\033[39m\n\r');
            }
        }else{
            broadcast(nickname+':'+data+'\n\r',true);
        }
    });
    conn.on('close',function(){
        count--;
        delete users[nickname];
        broadcast(nickname+' left the room\n\r',true);
    });
    function broadcast(msg,exc){
        for(i in users){
            if(!exc||i!=nickname){
                users[i].write(msg);
            }
        }
    }
});
server.listen(3000,function(){
    console.log('\033[96m server listen on:*:3000 \033[39m');
});