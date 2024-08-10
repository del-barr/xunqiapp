function buling(num){
    if(num < 10){
        return '0' + num
    }else{
        return num
    }
}
exports.timestampToTime = (timestamp) => {
  // 时间戳为10位需*1000，时间戳为13位不需乘1000
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = buling(date.getHours()) + ':'
  var m = buling(date.getMinutes()) + ':'
  var s = buling(date.getSeconds())
  return Y + M + D + h + m + s
}



