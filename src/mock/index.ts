import Mock from 'mockjs'
import homeApi from './home'

Mock.mock(/\/wuliuTest/, 'post', homeApi.data)