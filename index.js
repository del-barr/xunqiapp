#!/usr/bin/env node
const express = require("express");
const app = express();
const crypto = require("crypto");
/* 导入cors跨域方案 */
const cors = require("cors");
/* 防止vue使用historymode出现404 */
const history = require("connect-history-api-fallback");
// 使用中间件
app.use(history());
app.use(express.urlencoded({ extended: false }));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/* const */
const jwtConfig = require("./base/config").jwtConfig.jwtSecretKey;
/* 注册cors中间件 */
app.use(cors());
/* 防止报错终止程序 */
process.on("uncaughtException", function (err) {
  console.log(err);
});
/* jwt中间件 */
const expressJWT = require("express-jwt");
app.use(expressJWT({ secret: jwtConfig }).unless({ path: [/^\//] }));
const jwt = require("jsonwebtoken");

app.use("/api", function (req, res, next) {
  // req.body = decrypt(req.body.data,req.body.word)
  if (!req.headers.authorization) {
    next();
  } else {
    const token = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      "babadawosa"
    );
    req.jwtword = token;
    next();
  }
});
app.use("/manageapi", function (req, res, next) {
  if (!req.headers.authorization)
    return res.send({ status: 204, message: "权限不足 拒绝访问" });
  const token = jwt.verify(
    req.headers.authorization.replace("Bearer ", ""),
    "babadawosa"
  );
  if (Number(String(token.exp) + "000") < Date.now()) {
    return res.send({ status: 204, message: "权限失效" });
  }
  req.jwtword = token;
  next();
});
const multer = require('multer');

// 配置Multer中间件
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 指定上传文件的保存路径
    cb(null, 'web/image');
  },
  filename: (req, file, cb) => {
    // 自定义文件名
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// 定义上传图片的路由
app.post('/upload', upload.single('file'), (req, res) => {
  // 处理上传的文件
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  // res.send('File uploaded successfully.');
  console.log(file);
  res.send({
    status: 200,
    message: "请求成功",
    data: {
      url:`/static/${file.filename}`,
      path:file.filename
    },
  });
});

/* 客户端接口 */
app.use("/api", require("./router/api/index"));
/* 后台接口 */
app.use("/apiv2", require("./router/manage/manageApi"));

app.use('/static', express.static('./web/image'));
app.use('/', express.static('./web/dist'));

/* 启动服务器 */
app.listen(8080, () => {
  console.log("you server is running. 127.0.0.1:8080");
});
