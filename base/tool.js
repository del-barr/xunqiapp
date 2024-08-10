function buling(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }
  exports.timestampToTime = (timestamp) => {
    // 时间戳为10位需*1000，时间戳为13位不需乘1000
    var date = new Date(timestamp);
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h = buling(date.getHours()) + ":";
    var m = buling(date.getMinutes()) + ":";
    var s = buling(date.getSeconds());
    return Y + M + D + h + m + s;
  };
  exports.samtodate = (samp) => {
    const date = new Date(samp); // 创建一个Date对象
    const year = date.getFullYear(); // 获取年份
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 获取月份（注意月份要加1，且需要补零）
    const day = String(date.getDate()).padStart(2, "0"); // 获取日期（需要补零）
    const hour = String(date.getHours()).padStart(2, "0"); // 获取小时（需要补零）
    const minute = String(date.getMinutes()).padStart(2, "0"); // 获取分钟（需要补零）
    const second = String(date.getSeconds()).padStart(2, "0"); // 获取秒数（需要补零）
    const millisecond = String(date.getMilliseconds()).padStart(3, "0"); // 获取毫秒数（需要补零）
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`; // 拼接日期字符串
  };
  /* 分页函数 */
  exports.getpage = (page) => {
    return {
      start: (page - 1) * 10,
      end: (page - 1) * 10 + 10,
    };
  };
  exports.basemd5 = (min, max) => {
    var str = '',
      range = min,
      arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
      ]
    // 随机产生
    range = Math.round(Math.random() * (max - min)) + min
    for (var i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1))
      str += arr[pos]
    }
    return str
  }
  
  
  exports.generateSerialNumber = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0');
    const serialNumber = year + month + day + hours + minutes + seconds + milliseconds;
  
    return serialNumber;
  }