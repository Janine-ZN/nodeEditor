//引入上一级目录下的mysql连接池对象
const pool = require('../pool.js');
const express = require('express');
//创建空路由器
var router = express.Router();

//添加路由
// 1.测试数据库是否连接成功
router.get('/list', (req, res) => {

    pool.query('SELECT * FROM news', [], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// 2.展示单篇文章
router.get('/article', (req, res) => {
    pool.query('SELECT content FROM news WHERE menu=? and submenu=?', ["一级菜单", "二级菜单"], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/add', (req, res) => {
    var obj = req.body;
    var $menu = obj.menu;
    var $submenu = obj.submenu
    var $content = obj.content;
    console.log("内容==》" + $content);

    pool.query("INSERT INTO news (id,menu,submenu,content,created_time,last_modified_time) SELECT ?,?,?,?,?,? from DUAL where not exists(select content from news where content = ?)",
        [null, $menu, $submenu, $content, '2019-02-03', '2019-06-06', $content], (err, result) => {
            if (err) throw err;
            console.log(111);
            console.log(result);
            if (result.affectedRows > 0) {
                res.send({
                    code: 200,
                    msg: '数据插入成功！'
                });
            }

            //是否添加成功
            if (result.affectedRows == 0) {
                res.send({
                    code: 200,
                    msg: '数据标题重复！'
                });
            }
        });
});

//导出路由器
module.exports = router;