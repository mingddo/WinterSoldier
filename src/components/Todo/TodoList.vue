<template>
  <div>
    <Todo v-for="(todo, idx) in todos" :key="idx" :todo="todo" />
  </div>
</template>

<script>
import Todo from './Todo';
import {todoList} from "../../api/todo.js"
export default {
  name: 'TodoList',
  components: {
    Todo,
  },
  data : function() {
    return {
      todos : null
    }
  },
  created () {
    todoList(
      (response) => {
        console.log(response);
        this.todos = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  // computed: {
  //   todos: function() {
  //     return this.$store.state.todos;
  //   },
  // },
};
</script>

<style></style>
