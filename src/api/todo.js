import {AuthorizationInstance} from './index.js'

const instance = AuthorizationInstance();

function writeTodo(todo, success, fail) {
    instance
    .post('todos/', todo)
    .then(success)
    .catch(fail);

}

function todoList(success, fail) {
    instance
    .get('todos/')
    .then(success)
    .catch(fail);
}

function getTodo(todono, success, fail) {
    instance
    .get(`todos/${todono}`)
    .then(success)
    .catch(fail);
}
function deleteTodo(todono, success, fail) {
    instance
    .delete(`todos/${todono}`)
    .then(success)
    .catch(fail);
}

function ModifyTodo(todono, success, fail) {
    instance
    .put(`todos/${todono}/`)
    .then(success)
    .catch(fail);

}

function todoCompleted(todo, success, fail) {
    instance
    .put(`todos/${todo.id}/`, todo)
    .then(success)
    .catch(fail);
}

export { writeTodo, todoList, todoCompleted , getTodo, deleteTodo, ModifyTodo}
