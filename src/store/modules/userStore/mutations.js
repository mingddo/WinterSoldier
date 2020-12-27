export const setIsLogined = (state, isLogin) => {
  state.isLogin = isLogin;
};
export const setUserInfo = (state, userInfo) => {
  state.isLogin = true;
  state.userInfo = userInfo;
};
export const logout = (state) => {
  state.isLogin = false;
  state.userInfo = null;
};
