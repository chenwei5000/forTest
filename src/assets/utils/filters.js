import Vue from 'vue'
import moment from 'moment'

// 处理时间的格式化
Vue.filter('dateFormat', (val, str) => {
  return moment(val).format(str)
})

// 处理货币
Vue.filter('MoneyFormat', function(money) {
  if (money && money != null) {
    money = String(money)
    const left = money.split('.')[0]
    let right = money.split('.')[1]
    right = right
      ? right.length >= 2
        ? '.' + right.substr(0, 2)
        : '.' + right + '0'
      : '.00'
    var temp = left
      .split('')
      .reverse()
      .join('')
      .match(/(\d{1,3})/g)
    return (
      '￥' +
      ((Number(money) < 0 ? '-' : '') +
        temp
          .join(',')
          .split('')
          .reverse()
          .join('') +
        right)
    )
  } else if (money === 0) {
    return '￥0.00'
  } else {
    return ''
  }
})
