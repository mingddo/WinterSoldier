import state from './state';
import * as mutations from './mutations';
import * as actions from './actions';

const weather = {
  namespace: false,
  state,
  mutations,
  actions,
};

export default weather;
