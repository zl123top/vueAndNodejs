//语法都不一样了，貌似被express取代了，老子不学这个模块了
var connect = require('connect');
/*创建服务器*/
var server = connect();
//处理静态文件
server.use(connect.static(__dirname + '/website'))
server.listen(3000);