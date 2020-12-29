<template>
  <div>
      <!-- <input @keypress.enter="createTodo" v-model="todoTitle" type="text">
      <button @click="createTodo">Add</button> -->
      <div class="modal">
        <div class="overlay" @click="$emit('close-modal')">
        </div> 
        <div class="modal-card"> 
          <form @submit="OnSubmit">
            <h4> 제목을 입력하세요 : <input type="text" v-model="form.title" placeholder="title"></h4>
            <h4> 계획 시간
            <input type="text" v-model="form.schedule_year" placeholder="year">
            <input type="text" v-model="form.schedule_month" placeholder="month">
            <input type="text" v-model="form.schedule_date" placeholder="date">
            <input type="text" v-model="form.schedule_hour" placeholder="hour">
            <input type="text" v-model="form.schedule_min" placeholder="min">
            </h4>
            <br>
            <h4> 알람 시간
            <input type="text" v-model="form.alarm_year" placeholder="alarm-year">
            <input type="text" v-model="form.alarm_month" placeholder="alarm-month">
            <input type="text" v-model="form.alarm_date" placeholder="alarm-date">
            <input type="text" v-model="form.alarm_hour" placeholder="alarm-hour">
            <input type="text" v-model="form.alarm_min" placeholder="alarm-min">
            </h4>
            <button type="submit">제출하기</button>
          </form>
        </div>
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
            title : '',
            schedule_year : 0,
            schedule_month : 0,
            schedule_date : 0,
            schedule_hour : 0,
            schedule_min : 0,
            alarm_year : 0,
            alarm_month : 0,
            alarm_date : 0,
            alarm_hour : 0,
            alarm_min : 0
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
.modal, .overlay { width: 75%; height: 75%; position: fixed; left: 0; top: 0; color: white; } 
.overlay { opacity: 0.5; background-color: black; } 
.modal-card { position: relative; max-width: 80%; margin: auto; margin-top: 30px; padding: 20px; background-color: rgb(240, 240, 175); min-height: 500px; z-index: 10; opacity: 1; }

</style>