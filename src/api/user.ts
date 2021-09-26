//引入mockjs
import Mock from 'mockjs'
// 反序列化
import querystring from 'querystring'
//使用mockjs模拟数据
//延时100-200毫秒请求到数据
Mock.setup({
  timeout: '100-200'
})
Mock.mock('/login', 'post', (req) => {
  debugger
  // const {loginName, loginPassword} = querystring.parse(req.body)
  // let res = {
  //   code: '',
  //   msg: '',
  //   result: {}
  // } 
  // if (loginName === 'admin' && loginPassword === '123456') {
  //   res = {
  //     "code": 1,
  //     "msg": '成功',
  //     "result": {
  //       "birthday": "@datetime", // 随机生成日期时间
  //       "nickname": "@cname"  // 随机生成中文名字
  //     }
  //   }
  // } else {
  //   res = {
  //     code: 0,
  //     msg: '失败',
  //     result: '登录名或者密码错误!'
  //   }
  // }
  return 1
});