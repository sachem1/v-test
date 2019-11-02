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
import fileLibraryNo from './business/bsbookrecord/fileLibraryNo';
import goodsErp from './business/goodserprelation';
import billIn from '@/store/business/bill/billIn';
import itRecord from './business/bsbookrecord/itRecord';
import emsRecordInfo from './business/bsbookrecord/emsrecordinfo';
import itRecordInfo from './business/bsbookrecord/itRecordInfo';
import erpconsume from './business/bsbookrecord/erpconsume';
import heBaseConfig from './business/bsbookrecord/heBaseConfig';
Vue.use(Vuex);

const store = new Vuex.Store({
    // plugins: [createPersistedState({
    //     storage: window.sessionStorage
    // })],
    state: {
        //
        hasRouter: false
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
        fileLibraryNo,
        goodsErp,
        itRecord,
        billIn,
        itRecordInfo,
        emsRecordInfo,
        erpconsume,
        heBaseConfig
    }
});

export default store;
