import Mock from 'mockjs'
import {getMenuList} from './response/menu'
import user from './response/userinfo'

Mock.mock(/\/metadata/, 'get', getMenuList)

Mock.mock(/\/getUser/, 'get', user.getUserInfo)

export default Mock