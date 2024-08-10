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
const copys = require('../../routerMode/api/web')
/* 获取应用列表接口 get_applist */
router.post('/get_applist', copys.get_applist)
/* 获取导航列表接口 get_navlist */
router.post('/get_navlist', copys.get_navlist)
/* 获取单个应用 get_app_one */
router.post('/get_app_one', copys.get_app_one)
/* 获取应用截图 get_app_screenshot */
router.post('/get_app_screenshot', copys.get_app_screenshot)
/* 获取下载链接 get_app_downurl */
router.post('/get_app_downurl', copys.get_app_downurl)
/* 获取分类 get_class_list */
router.post('/get_class_list', copys.get_class_list)
/* 后台登录 admin_login */
router.post('/admin_login', copys.admin_login)

module.exports = router
