<template>
  <div class="home">
    <TodoForm/>
    <TodoList/>
    <Calendar/>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from './Todo/TodoList.vue'
import TodoForm from './Todo/TodoForm.vue'
import Calendar from './Calendar.vue'

export default {
  name: 'Home',
  components: {
    TodoList,
    TodoForm,
    Calendar,
  }
}
</script>
