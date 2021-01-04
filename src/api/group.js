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


export { 
  makegroup,
  deletegroup,
  groupdetail,
  invitegroup,
  denyinvite,
  approveinvite,
  deletemember,
  changemaster
 }