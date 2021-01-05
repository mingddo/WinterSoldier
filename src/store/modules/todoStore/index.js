import state from './state';
import * as mutations from './mutations';
import * as actions from './actions';

const todoStore = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default todoStore;
