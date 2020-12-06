import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    todos : [
    ]
  },
  getters:{

  },
  mutations: {
    CREATE_TODO : function(state,todoItem) {
      // console.log('CREATE_TODO CALLS')
      // console.log(state)
      // console.log(todoItem)
      state.todos.push(todoItem)
    },
    DELETE_TODO : function(state,todoItem) {
      const Index = state.todos.indexOf(todoItem)
      state.todos.splice(Index,1)
    },
    UPDATE_TODO_STATUS : function(state,todoItem) {
      state.todos = state.todos.map((todo) => {
        if (todo === todoItem) {
          return {
            ...todoItem,
            completed : !todo.completed
          }
        }
        return todo
      })
    }
  },
  actions: {
    create_todo : function (context,todoItem) {
      // console.log(context)
      // console.log(todoItem)
    context.commit('CREATE_TODO',todoItem)
    },
    deleteTodo : function({commit},todoItem) {
      commit('DELETE_TODO',todoItem)
    },
    updateTodoStatus : function({commit},todoItem) {
      commit('UPDATE_TODO_STATUS',todoItem)
    }
  },
})
