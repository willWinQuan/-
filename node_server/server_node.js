
//引入http模块
var http = require("http");
//设置主机名
var hostName = '127.0.0.1';
//设置端口
var port = 8081;

var fs=require('fs');

let mime={
    '.js':'application/javascript',
    '.css':'text/css'
}
//创建一个函数，req代表客户端，res代表服务器可写流
let listener=(req,res)=>{
//res是可写流，有write和end
    if(req.url==="/"){
        //设置编码
        res.setHeader('Content-Type','text/html;charset=utf-8');
        fs.createReadStream('test.html').pipe(res);
    }else{
        if(fs.existsSync(`.${req.url}`)) {
            res.setHeader('Content-Type',mime[req.url.match(/\.\w+$/)[0]] +';charset=utf-8');
            fs.createReadStream(`.${req.url}`).pipe(res);
        }else{
            res.statusCode=404;
            res.end();
        }
    }

};
//创建服务
var server = http.createServer(listener);

server.listen(port,hostName,function(){
    console.log(`服务器运行在http://${hostName}:${port}`);
});
