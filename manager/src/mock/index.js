import Mock from 'mockjs';
import {
    getMenuList
} from './response/menu'

Mock.mock(/\/metadata/, 'get', getMenuList)

export default Mock