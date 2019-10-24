import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import app from './modules/app';
import login from './modules/login';
import service from './modules/service';
import commons from './modules/common';
// import router from './modules/router';

import trade from './business/trade';
import user from './business/user';
import test from './business/test';
import FileLibraryNo from './business/FileLibraryNo';
import goodsErp from './business/goodserprelation';
import billIn from '@/store/business/bill/billIn';
import itRecord from './business/bsbookrecord/itRecord';

Vue.use(Vuex);

const store = new Vuex.Store({
    //plugins: [createPersistedState({ storage: window.sessionStorage })],
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
        commons,
        trade,
        login,
        test,
        FileLibraryNo,
        goodsErp,
        itRecord,
        billIn
    }
});

export default store;
