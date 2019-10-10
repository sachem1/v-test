import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

import app from './modules/app';
import login from './modules/login';
import service from './modules/service';
// import router from './modules/router';

import trade from './business/trade';
import user from './business/user';
import test from './business/test';

Vue.use(Vuex);

const store = new Vuex.Store({
    // plugins: [createPersistedState({ storage: window.sessionStorage })],
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
        test
        // router
    }
});

export default store;