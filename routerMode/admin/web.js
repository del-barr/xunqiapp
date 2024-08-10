const getmysql = require("../../base/config");
const basemd5 = require("../../base/base_TOKEN");
const timestampToTime = require("../../base/time").timestampToTime;
const util = require("util");
// 定义 queryAsync 方法
getmysql.db.queryAsync = util.promisify(getmysql.db.query);
/* 获取用户列表 */
