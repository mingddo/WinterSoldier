<template>
  <div>
      <input @keypress.enter="createTodo" v-model="todoTitle" type="text">
      <button @click="createTodo">Add</button>

  </div>
</template>

<script>
export default {
    name : "TodoForm",
    data : function() {
      return {
        todoTitle : '',
      }
    },
    methods: {
      createTodo : function() {
        // console.log('create')
        const todoItem = {
          title : this.todoTitle,
          completed : false
        }
        // this.$store.commit('CREATE_TODO',todoItem)
        this.$store.dispatch('create_todo',todoItem)
        this.todoTitle = ''
      }
    }
}
</script>

<style>

</style>