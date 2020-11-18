import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions'
import {mutations,state,getters} from './mutations'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import vip from './modules/vip'
import banner from './modules/banner'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        cate,
        specs,
        goods,
        vip,
        banner
    }
})