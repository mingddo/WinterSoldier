import { createInstance } from "./index.js";

const instance = createInstance();

function usersignup (user, success, fail) {
  instance
    .post(`accounts/signup/`, user)
    .then(success)
    .catch(fail);
}

export { usersignup }