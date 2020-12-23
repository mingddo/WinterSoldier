import {AuthorizationInstance} from './index.js'

const instance = AuthorizationInstance();

function writeTodo(todo, success, fail) {
    instance
    .post('todos/', todo)
    .then(success)
    .catch(fail);

}
export {writeTodo}
