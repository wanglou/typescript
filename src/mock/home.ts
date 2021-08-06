import Mock from 'mockjs'
let mockUserInfo = {
  "code": 0,
  "data": {
    "fullName": "@CNAME", // 随机生成中文人名
    "userId": 1000234234001,
  }
};
export default {
  data: function (params) {
    // 生成随机字符串，指定长度和范围
    // console.log(Mock.mock('@cword(10, 15)'))

    // 生成标题和句子
   /*  console.log(Mock.mock(
      {
        title: '@ctitle',
        sentence: '@csentence'
      })
    ) */

    // 生成段落
    /* console.log(Mock.mock(
      {
        paragraph: '@cparagraph'
      })
    )  */

    // 生成数字
    /* console.log(Mock.mock(
      {
        'number|1-80': 1
      })
    ) */

    // 生成增量ID
    /* console.log(Mock.mock('@increment'))
    console.log(Mock.mock('@increment')) */

    // 生成姓名-地址-身份证号
    /* console.log(Mock.mock(
      {
        name: '@cname()',
        idCard: '@id()',
        address: '@city(true)' // 如果@city(),只会生成市，如果@city(true)会生成省和市
      })
    ) */

    /* 随机生成图片
      参数1：图片可选大小
      参数2：图片背景色
      参数3：图片前景色
      参数4：图片格式
      参数5：图片文字 */
    /* console.log(Mock.mock({
      image: "@image('300x300', '#50B347', '#FFF', 'Mock.js')"
    })) */

    // 生成时间
    /* console.log(Mock.mock({
      time1: '@date()', // 只有年月日
      time2: '@date(yyyy-MM-dd HH:mm:ss)'
    })) */

    // 指定数组返回的条数
    /* console.log(Mock.mock({
      'list|50-99':[
        {
          name: '@cname()',
          address: '@city(true)',
          id: '@increment(1)' // 每次都增加1
        }
      ]
    })) */

    const arr = Mock.mock({
      'list|5-10': [{
        name: '@cname()',
        address: '@city(true)',
        id: '@increment(1)'
      }]
    })
    return Mock.mock({
      code: 200,
      msg: 'success',
      data: arr
    })
  }
}