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

router.get('/add', (req, res) => {
    var content = `router.get('/list', (req, res) => {
            pool.query('SELECT * FROM news', [], (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        });`;
    pool.query(`insert into news values(?,?,?,?,?,?)`, [null, "agent说明", content, '2019-02-03', '2019-06-06', 1], (err, result) => {
        if (err) throw err;
        //是否添加成功
        if (result.affectedRows > 0) {
            res.send({
                code: 200,
                msg: 'register suc'
            });
        }
    });
});

//导出路由器
module.exports = router;