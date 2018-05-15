//我的第一个node程序，读取当前目录文件和文件夹
var fs = require('fs')
,stdin=process.stdin
,stdout=process.stdout;
fs.readdir(process.cwd(),function(err,files){
    var stats=[];
    console.log('');
    if(files.length==0){
        return console.log('\033[31m No files to show!\033[39m\n');
    }
    console.log('选择一个文件或者文件夹');
    file(0);
    function file(i){
        var filename=files[i];
        fs.stat(__dirname+'/'+filename,function(err,stat){
            stats[i]=stat;
            if(stat.isDirectory()){
                console.log(' '+i+' \033[36m'+filename+'\033[39m');
            }else{
                console.log(' '+i+' \033[90m'+filename+'\033[39m');
            }
            i++;
            if(i==files.length){
                read();
            }else{
                file(i);
            }
        });
    }
    function read(){
        console.log(' ');
        stdout.write(' \033[33m输入你的选择：\033[39m');
        stdin.resume();
        stdin.setEncoding('utf-8');
        stdin.on('data',option);
    }
    function option(data){
        var filename=files[Number(data)];
        if(!filename){
            stdout.write(' \033[33m输入你的选择：\033[39m');
        }else{
            stdin.pause();
            if(stats[Number(data)].isDirectory()){
                fs.readdir(__dirname+'/'+filrname,function(err,files){
                    console.log('');
                    console.log(' ('+files.length+' files)');
                    files.forEach(function(file){
                        console.log(' -'+file);
                    });
                    console.log('');
                });
            }else{
                fs.readFile(__dirname+'/'+filename,'utf8',function(err,data){
                    console.log('');
                    console.log('\033[90m'+data.replace(/(.*)/g,'    $1')+'\033[39m');
                });
            }
        } 
    }
});