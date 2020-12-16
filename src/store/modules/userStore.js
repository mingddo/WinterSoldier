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
  },
  actions: {
  },
}

export default userStore