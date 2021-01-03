import {createInstance} from './index.js'

const instance = createInstance();

function writeTodo(todo, success, fail) {
    instance
    .post('todos/', todo, {},{headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
    .then(success)
    .catch(fail);

}

function todoList(success, fail) {
    instance
    .get('todos/', {headers : {
        Authorization : `jwt ${localStorage.getItem('jwt')}`
      } })
    .then(success)
    .catch(fail);
}

function getTodo(todono, success, fail) {
    instance
    .get(`todos/${todono}`, {headers : {
        Authorization : `jwt ${localStorage.getItem('jwt')}`
      } })
    .then(success)
    .catch(fail);
}
function deleteTodo(todono, success, fail) {
    instance
    .delete(`todos/${todono}`, {headers : {
        Authorization : `jwt ${localStorage.getItem('jwt')}`
      } })
    .then(success)
    .catch(fail);
}

function ModifyTodo(todono, success, fail) {
    instance
    .put(`todos/${todono}/`, {}, {headers : {
        Authorization : `jwt ${localStorage.getItem('jwt')}`
      } })
    .then(success)
    .catch(fail);

}

function todoCompleted(todo, success, fail) {
    instance
    .put(`todos/${todo.id}/`, todo, {headers : {
        Authorization : `jwt ${localStorage.getItem('jwt')}`
      } })
    .then(success)
    .catch(fail);
}

export { writeTodo, todoList, todoCompleted , getTodo, deleteTodo, ModifyTodo}
