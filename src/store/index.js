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

    }
  },
  actions: {
    create_todo : function (context,todoItem) {
      // console.log(context)
      // console.log(todoItem)
    context.commit('CREATE_TODO',todoItem)
    }
  },
})
