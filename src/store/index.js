import Vue from 'vue';
import Vuex from 'vuex';
import AxiosPlugin from 'vue-axios-cors';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
Vue.use(AxiosPlugin);

import userStore from './modules/userStore';
import weatherStore from './modules/weatherStore';

const store = new Vuex.Store({
  modules: {
    userStore,
    weatherStore,
  },
  state: {
    isTodoModalViewed: false,
    todos: [],
    user_data: [
      { name: 'avatar1', location: 'Daejeon' },
      { name: 'avatar2', location: 'Seoul' },
    ],
  },
  getters: {},
  mutations: {
    CREATE_TODO: function (state, todoItem) {
      // console.log('CREATE_TODO CALLS')
      // console.log(state)
      // console.log(todoItem)
      state.todos.push(todoItem);
    },
    DELETE_TODO: function (state, todoItem) {
      const Index = state.todos.indexOf(todoItem);
      state.todos.splice(Index, 1);
    },
    UPDATE_TODO_STATUS: function (state, todoItem) {
      state.todos = state.todos.map((todo) => {
        if (todo === todoItem) {
          return {
            ...todoItem,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    },
    IS_TODO_MODAL_VIEWED: function (state) {
      state.isTodoModalViewed = !state.isTodoModalViewed;
    }
  },
  actions: {
    create_todo: function (context, todoItem) {
      // console.log(context)
      // console.log(todoItem)
      context.commit('CREATE_TODO', todoItem);
    },
    deleteTodo: function ({ commit }, todoItem) {
      commit('DELETE_TODO', todoItem);
    },
    updateTodoStatus: function ({ commit }, todoItem) {
      commit('UPDATE_TODO_STATUS', todoItem);
    },
    isTodoModaViewed: function ({ commit }) {
      commit('IS_TODO_MODAL_VIEWED');
    }
  },
  plugins: [
    createPersistedState({
      paths: ['weather', 'userStore'], // 모듈에서 사용할 경우, 해당 모듈을 path에 추가.
    }),
  ],
});

export default store;
