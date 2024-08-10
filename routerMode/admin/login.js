const getmysql = require('../../base/config')
/* 导入token生成配置 */
const jwtconfig = require('../../base/config')
const jwt = require('jsonwebtoken')
exports.login = (req, res) => {
  const userinfo = req.body
  /* 判断用户名或密码是否合法 */

  console.log(userinfo);
  if (!userinfo.username || !userinfo.password) return res.send({ status: 201, message: '用户名或密码不合法' })
  /* 查询数据库表单 */
  getmysql.db.query('SELECT * FROM sem_ad_config', (err, results) => {
    /* 判断数据库链接状态 */
    if (err) return res.send({ status: 202, message: err.message })
    console.log(results);
    /* 判断账号密码是否正确 */
    if (results[0].admin == userinfo.username && results[0].pass == userinfo.password) {
      /* 生成token生成数据 */
      const adminData = { ...results[0], pass: '' }
      /* 生成token */
      const tokenStr = jwt.sign(adminData, jwtconfig.jwtConfig.jwtSecretKey, {
        expiresIn: jwtconfig.jwtConfig.expiresIn
      })
      res.send({ status: 200, message: '登录成功', token: 'Bearer ' + tokenStr })
    } else {
      res.send({ status: 203, message: '账号或密码错误' })
    }
  })
}
