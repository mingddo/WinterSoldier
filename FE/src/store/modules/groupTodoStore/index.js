import state from './state';
import * as mutations from './mutations';

const groupTodoStore = {
  namespaced: true,
  state,
  mutations,
};

export default groupTodoStore;
