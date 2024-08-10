const express = require('express')
const router = express.Router()
function preventDuplication(req, res, next) {
    let isResponded = false;
    const originalSend = res.send;
  
    // 拦截 res.send 方法
    res.send = function() {
      if (!isResponded) {
        originalSend.apply(res, arguments);
        isResponded = true;
      }
    };
  
    next();
  }
/* 企业接口 */
const copys = require('../../routerMode/manage/api')
/* 新增软件 */
router.post('/add_app', copys.add_app)
/* 删除软件 del_app */
router.post('/del_app', copys.del_app)
/* 编辑应用信息 update_app */
router.post('/update_app', copys.update_app)
/* 新增扥类 add_class */
router.post('/add_class', copys.add_class)
/* 编辑费分类 update_class */
router.post('/update_class', copys.update_class)
/* 删除分类 del_class */
router.post('/del_class', copys.del_class)
router.post('/add_nav', copys.add_nav)
/* 编辑费分类 update_class */
router.post('/update_nav', copys.update_nav)
/* 删除分类 del_class */
router.post('/del_nav', copys.del_nav)

/* 编辑导航归属 update_type_app */
router.post('/update_type_app', copys.update_type_app)
/* 获取首页信息 get_home */
router.post('/get_home', copys.get_home)

/* add_app */


module.exports = router
