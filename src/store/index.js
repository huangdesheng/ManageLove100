import Vue from 'vue'
import vuex from 'vuex'
import service from '@/api'
import {
  getToken,
  setToken,
  setUserName,
  getUserName,
  setMenus,
  getMenus
} from "@/utils/authority.js";

console.log(getMenus())
Vue.use(vuex)
const state = {
  token: getToken(),
  username: getUserName(),
  menusLists: getMenus() == undefined ? '' : JSON.parse(getMenus())

}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_MENUS(state, menus) {
    state.menusLists = menus
  }
}

const getters = {
  token: state => state.token,
}

const actions = {
  qxLoginByUsername({
    commit
  }, userInfo) {
    return new Promise((resolve, reject) => {
      service.login(userInfo).then(res => {
        console.log(res)
        if (res.code === 200) {
          commit('SET_TOKEN', res.data.token);
          commit('SET_USERNAME', res.data.username);
          commit('SET_MENUS', res.data.menus)
          setToken(res.data.token);
          setUserName(res.data.username);
          setMenus(res.data.menus)
          resolve(res);
        } else {
          resolve(res);
        }
      }).catch(error => {
        reject(error);
      })
    })
  }
}


export default new vuex.Store({
  state,
  mutations,
  actions,
  getters
})
