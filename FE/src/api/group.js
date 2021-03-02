import { createInstance } from "./index.js";

const instance = createInstance();

function makegroup(group, success, fail) {
  instance
  .post(`group/`,group, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}

function deletegroup(group_pk, success, fail) {
  instance
  .delete(`group/${group_pk}/`, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}

function groupdetail(group_pk, success, fail) {
  instance
  .get(`group/${group_pk}/`, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}

function invitegroup(group_pk, username, success, fail) {
  instance
  .get(`group/${group_pk}/invite/${username}/`, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}

function denyinvite(group_pk, username, success, fail) {
  instance
  .delete(`group/${group_pk}/invite/${username}/`, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail); 
}

function approveinvite(group_pk, username, success, fail) {
  instance
  .get(`group/${group_pk}/member/${username}/`, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}

function deletemember(group_pk, username, success, fail) {
  instance
  .delete(`group/${group_pk}/member/${username}/`, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}

function changemaster(group_pk, username, success, fail) {
  instance
  .get(`group/${group_pk}/master/${username}/`, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}

function createGroupTodo(group_pk, group, success, fail) {
  instance
  .post(`group/${group_pk}/todo/`, group, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}
function readGroupTodo(group_pk, success, fail) {
  instance
  .get(`group/${group_pk}/todo/`, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}
function updateGroupTodo(group_pk, todo_pk, group, success, fail) {
  instance
  .put(`group/${group_pk}/todo/${todo_pk}/`, group, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}
function deleteGroupTodo(group_pk, todo_pk, success, fail) {
  instance
  .delete(`group/${group_pk}/todo/${todo_pk}/`, {headers : {
    Authorization : `jwt ${localStorage.getItem('jwt')}`
  } })
  .then(success)
  .catch(fail);
}

export { 
  makegroup,
  deletegroup,
  groupdetail,
  invitegroup,
  denyinvite,
  approveinvite,
  deletemember,
  changemaster,
  createGroupTodo,
  readGroupTodo,
  updateGroupTodo,
  deleteGroupTodo
 }