var net = require('net');
var client = net.connect('3000','irc.freenode.net',function(){
    client.write('NICK mynick\r\n');
    client.write('USER mynick 0*:realname\r\n');
    client.write('JOIN #node.js\r\n');
});
client.setEncoding('utf-8');