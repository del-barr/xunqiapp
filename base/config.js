/* 获取数据库信息 */
const fs = require('fs')
/* 导入数据库配置 */
const mysql = require('mysql')
/* 获取数据库配置t文件 */
const config = JSON.parse(fs.readFileSync('./config.json'))
/* 共享数据库配置文件 */
exports.db = mysql.createPool(config.MysqlConfig)
/* 导入token生成配置 */
exports.jwtConfig = config.jwtConfig
