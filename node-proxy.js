 const express = require("express");
 const app = express();

/*  let dataSet = [{
         "id": "0",
         "name": "张三",
         "age": 20
     },
     {
         "id": "1",
         "name": "李四",
         "age": 34
     },
     {
         "id": "2",
         "name": "王五",
         "age": 30
     },
     {
         "id": "3",
         "name": "马六",
         "age": 50
     }
 ];
 app.get("/products", (req, res) => {
     res.json(dataSet);
 }); */

 app.listen(8000, "localhost", () => console.log("服务已经启动"))