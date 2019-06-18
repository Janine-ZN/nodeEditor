const express = require('express');
const bodyParser = require('body-parser');
const editorRouter = require('./routes/editor.js');

//创建web服务器
var server = express();

//allow custom header and CORS
server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); // 让options请求快速返回
    } else {
        next();
    }
});

server.listen(3000);

//使用body-parser中间件将post请求数据解析为对象
//注意：一定要写在路由的前边
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());


//把 编辑 路由器挂载到/editor
// /editor/list
server.use('/editor', editorRouter);