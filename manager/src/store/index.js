import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import service from './modules/service';
import customer from './modules/customer';
import product from './modules/product';
import responder from './modules/responder';
import statistics from './modules/statistics';
import statisticssetting from './modules/statisticssetting';
import log from './modules/log';

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
        customer,
        product,
        responder,
        statistics,
        statisticssetting,
        log
    }
});

export default store;
