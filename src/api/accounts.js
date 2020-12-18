import { createInstance } from "./index.js";

const instance = createInstance();

function usersignup (user, success, fail) {
  instance
    .post(`accounts/signup/`, user)
    .then(success)
    .catch(fail);
}

function userlogin (user, success, fail) {
  instance
    .post(`accounts/api_token_auth/`, user)
    .then(success)
    .catch(fail);
}

export { usersignup, userlogin }