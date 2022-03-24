module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 能够吧所有元素的px单位转成rem
      // rootValue: 转换px的基准值
      // 编码时,一个元素款式75px.则换成rem之后为2rem
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
