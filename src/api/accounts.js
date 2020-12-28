import { createInstance } from "./index.js";
import { AuthorizationInstance } from "./index.js";

const instance = createInstance();
const Authorinstance = AuthorizationInstance();

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

function userprofile (username, success, fail) {
  instance
    .get(`accounts/profile/${username}/`)
    .then(success)
    .catch(fail);
}

async function findById(username, success, fail) {
  instance
    .get(`accounts/profile/${username}/`)
    .then(success)
    .catch(fail);
}

function addfollow(username, success, fail) {
  Authorinstance
  .post(`accounts/follow/${username}/`)
  .then(success)
  .catch(fail);
}

function removefollow(username, success, fail) {
  Authorinstance
  .delete(`accounts/follow/${username}/`)
  .then(success)
  .catch(fail);
}

export { usersignup, userlogin, userprofile, findById, addfollow, removefollow }