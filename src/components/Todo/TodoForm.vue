<template>
  <div>
      <!-- <input @keypress.enter="createTodo" v-model="todoTitle" type="text">
      <button @click="createTodo">Add</button> -->
      <div>
          <form @submit="OnSubmit">
            <input type="text" v-model="form.Todo_title" placeholder="title">
            <input type="text" v-model="form.Todo_schedule_year" placeholder="year">
            <input type="text" v-model="form.Todo_schedule_month" placeholder="month">
            <input type="text" v-model="form.Todo_schedule_date" placeholder="date">
            <input type="text" v-model="form.Todo_schedule_hour" placeholder="hour">
            <input type="text" v-model="form.Todo_schedule_min" placeholder="min">
            <br>
            <input type="text" v-model="form.Todo_alarm_year" placeholder="alarm-year">
            <input type="text" v-model="form.Todo_alarm_month" placeholder="alarm-month">
            <input type="text" v-model="form.Todo_alarm_date" placeholder="alarm-date">
            <input type="text" v-model="form.Todo_alarm_hour" placeholder="alarm-hour">
            <input type="text" v-model="form.Todo_alarm_min" placeholder="alarm-min">
            <button type="submit">제출하기</button>
          </form>
      </div>

  </div>
</template>

<script>
import {writeTodo} from "../../api/todo.js"
export default {
    name : "TodoForm",
    data : function() {
      return {
        form: {
            Todo_title : '',
            Todo_schedule_year : 0,
            Todo_schedule_month : 0,
            Todo_schedule_date : 0,
            Todo_schedule_hour : 0,
            Todo_schedule_min : 0,
            Todo_alarm_year : 0,
            Todo_alarm_month : 0,
            Todo_alarm_date : 0,
            Todo_alarm_hour : 0,
            Todo_alarm_min : 0
          }
      };
    },
    methods: {
      OnSubmit : function() {
        event.preventDefault();
        writeTodo(
          this.form,
          console.log('확인'),
          () => {
            console.log(this.form),
            console.log(`jwt ${localStorage.getItem('jwt')}`)
            // this.$router.push({ name: ""});
          },
          (error) => {
            console.log(error);
          }

        )
      },
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