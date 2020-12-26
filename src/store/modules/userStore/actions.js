import jwt_decode from "jwt-decode";
import { findById } from "@/api/accounts.js";

export const GET_MEMBER_INFO = ({ commit }, token ) => {
  let decode = jwt_decode(token);
  findById(
    decode.username,
    (res) => {
      console.log('유저정보', res);
      commit("setUserInfo", res.data);
    },
    (err) => {
      console.log(err);
    }
  );
};
export const LOGOUT = ({ commit }) => {
  commit("logout");
  localStorage.removeItem('jwt');
}
