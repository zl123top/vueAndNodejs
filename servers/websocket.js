var ws = require("nodejs-websocket")
 
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        setInterval(function(){
            conn.sendText('{"res":"登录成功"}')
        },3000)
        
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error", function (code, reason) {
        console.log(code)
    })
}).listen(8001)