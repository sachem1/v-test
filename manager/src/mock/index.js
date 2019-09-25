import Mock from 'mockjs';
import {
    getMenuList
} from './response/menu';
import user from './response/user';
import trade from './response/trade';

Mock.mock(/\/getMetadata/, 'get', getMenuList);

// Mock.mock(/\/getUser/, 'get', user.getUserInfo)

// Mock.mock(/\/GetPaged/, 'get', trade.getPageList())

// Mock.mock(/\/create/, 'post', trade.Create())

// Mock.mock(/\/delete/, 'post', trade.Delete())

Mock.mock(/\/TradeService1.json/, 'get', trade.GetTitle());

// Mock.mock(/\/UserService.json/, 'get', user.GetTitle());

export default Mock;
