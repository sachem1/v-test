import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import service from './modules/service';
import trade from './modules/trade';
import login from './modules/login';
import users from './modules/users';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        user,
        service,
        trade,
        login,
        users
    }
});

export default store;
