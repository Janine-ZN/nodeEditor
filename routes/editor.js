//引入上一级目录下的mysql连接池对象
const pool = require('../pool.js');
const express = require('express');
//创建空路由器
var router = express.Router();

//添加路由
// 1.展示数据列表
router.get('/list', (req, res) => {
    pool.query('SELECT * FROM news', [], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// 2.展示单篇文章
router.post('/article', (req, res) => {
    var obj = req.body;
    var $menu = obj.menu;
    var $submenu = obj.submenu
    console.log("一级菜单==》" + $menu, "二级菜单==》" + $submenu);
    pool.query('SELECT content FROM news WHERE menu=? and submenu=?', [$menu, $submenu], (err, result) => {
        if (err) throw err;
        console.log(result)
        if (result) {
            res.send(result);
        } else {
            res.send({
                code: 503,
                msg: '暂无数据！'
            });
        }
    });
});

// 3.新增
router.post('/add', (req, res) => {
    var obj = req.body;
    var $menu = obj.menu;
    var $submenu = obj.submenu
    var $content = obj.content;
    console.log("内容==》" + $content);

    pool.query("INSERT INTO news (id,menu,submenu,content,created_time,last_modified_time) SELECT ?,?,?,?,?,? from DUAL where not exists(select content from news where menu = ? and submenu =?)",
        [null, $menu, $submenu, $content, '2019-02-06', '2019-03-09', $menu, $submenu], (err, result) => {
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
                    msg: '相关内容已存在，如需更改请到编辑页面！'
                });
            }
        });
});

// 4.更改
router.post('/update', (req, res) => {
    var obj = req.body;
    var $menu = obj.menu;
    var $submenu = obj.submenu
    var $content = obj.content;
    console.log("内容==》" + $content);

    pool.query("UPDATE news SET content = ? WHERE menu = ? and submenu = ?",
        [$content, $menu, $submenu], (err, result) => {
            if (err) throw err;
            console.log(111);
            console.log(result);
            //判断是否更改成功
            if (result.affectedRows > 0) {
                res.send({
                    code: 200,
                    msg: 'update suc'
                });
            } else {
                res.send({
                    code: 301,
                    msg: 'update err'
                });
            }
        });
});

//导出路由器
module.exports = router;