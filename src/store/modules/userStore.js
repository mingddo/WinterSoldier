import jwt_decode from "jwt-decode";
import { findById } from "@/api/accounts.js";

const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    userInfo: null,
  },
  mutations: {
    setIsLogined(state, isLogin) {
      state.isLogin = isLogin;
    },
    setUserInfo(state, userInfo) {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    logout(state) {
      state.isLogin = false;
      state.userInfo = null;
    }
  },
  actions: {
    async GET_MEMBER_INFO({ commit }, token) {
      let decode = jwt_decode(token)
      await findById(
        decode.username,
        (res) => {
          console.log('데이터 확인?', res)
          commit("setUserInfo", res.data)
        },
        (err) => {
          console.log(err)
        }
      )
    },
    LOGOUT({ commit }) {
      commit("logout");
      localStorage.removeItem("jwt");
    }
  },
}

export default userStore