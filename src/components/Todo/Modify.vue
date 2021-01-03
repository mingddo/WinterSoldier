<template>
  <div>
      <!-- <input @keypress.enter="createTodo" v-model="todoTitle" type="text">
      <button @click="createTodo">Add</button> -->
      <div class="modal">
        <div class="overlay" @click="$emit('close-modal')">
        </div> 
        <div class="modal-card"> 
            <h2>{{todo.id}}번 글입니다.</h2>
            
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
            <button type="submit">수정하기</button>
          </form>
        </div>
      </div>

  </div>
</template>

<script>
import { ModifyTodo } from "../../api/todo.js"
export default {
name : "Modify",
props: {
    todo : Object
},
data() {
    const todono = Number(this.todo.id)
    console.log(todono + '번 글입니다.')
    return {
        todono : this.todo.id,
        form: {
            title : this.todo.title,
            schedule_year : this.todo.schedule_year,
            schedule_month : this.todo.schedule_month,
            schedule_date : this.todo.schedule_date,
            schedule_hour : this.todo.schedule_hour,
            schedule_min : this.todo.schedule_min,
            alarm_year : this.todo.alarm_year,
            alarm_month : this.todo.alarm_month,
            alarm_date : this.todo.alarm_date,
            alarm_hour : this.todo.alarm_hour,
            alarm_min : this.todo.alarm_min
          }
      };   
},
methods: {
    OnSubmit(event) {
        console.log(1)
        event.preventDefault();
        ModifyTodo(
          this.todono,this.todo,
          () => {
            console.log(this.form)
            this.$emit('close-modal')
          },
          (error) => {
            console.log(error);
          }

        )
      },
}


}
</script>

<style>
.modal, .overlay { width: 75%; height: 75%; position: fixed; left: 0; top: 0; color: white; } 
.overlay { opacity: 0.5; background-color: black; } 
.modal-card { position: relative; max-width: 80%; margin: auto; margin-top: 30px; padding: 20px; background-color: rgb(240, 240, 175); min-height: 500px; z-index: 10; opacity: 1; }

</style>