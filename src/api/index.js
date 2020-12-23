import axios from "axios";
import { API_BASE_URL } from "../config";

// axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function createInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });
  return instance;
}

function AuthorizationInstance() {
  const instance = axios.create({
    baseURL : API_BASE_URL,
    headers : {
      'Authorization' : `jwt ${localStorage.getItem('jwt')}`
    } 
  });
  return instance;
}
export { createInstance, AuthorizationInstance}