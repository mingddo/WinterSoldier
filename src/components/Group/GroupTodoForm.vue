<template>
  <div  class="group-todo-detail-modal">
    <div>
        <h1>CREATE</h1>
      </div>
    <div class="group-todo-detail-modal-close">
      <img
        class="pointer"
        @click="closeform"
        src="https://img.icons8.com/ios/50/000000/close-window.png" />
    </div>
    <div class="group-todo-form-modal-content">
      <input placeholder="title" type="text" id="title" v-model.trim="form.title">
      <div class="group-todo-form-modal-content-day">
        <input type="number" v-model="form.schedule_year">년
        <input type="number" v-model="form.schedule_month" min="1" max="12">월
        <input type="number" v-model="form.schedule_date" min="1" max="31">일
        <input type="number" v-model="form.schedule_hour" min="0" max="23">시
        <input type="number" v-model="form.schedule_min" min="0" max="59">분
      </div>
      <textarea value="내용을 입력해주세요" v-model="form.content"></textarea>
    </div>
    <div  class="group-todo-form-modal-btn">
      <img @click="createTodo" class="pointer" src="https://img.icons8.com/material-sharp/48/000000/ok--v2.png"/>
      <img @click="closeform" class="pointer" src="https://img.icons8.com/ios-glyphs/48/000000/xbox-x.png"/>
    </div>
  </div>
</template>

<script>
import { createGroupTodo } from "../../api/group.js";

export default {
  props: {
    day: Number,
    month: Number,
    year: Number,
    groupinfo: Object,
  },
  data () {
    return {
      form: {
        title: "",
        content: "내용을 입력해주세요",
        schedule_year: this.year,
        schedule_month: this.month,
        schedule_date: this.day,
        schedule_hour: 0,
        schedule_min: 0,
    }
    }
  },
  methods: {
    createTodo () {
      createGroupTodo(
        this.$route.query.groupid,
        this.form,
        () => {
        },
        (err) => {
          console.log('실패', err)
        }
      )
      this.$emit('NewTodo', this.form)
      this.$store.commit('groupTodoStore/changeAddTodoStatus', true)
      this.$store.commit('groupTodoStore/changeAddTodo', this.form)
    },
    closeform() {
      this.$emit('closeTodoform')
    },
  },
}
</script>

<style>
.group-todo-detail-modal {
  position: fixed;
  z-index: 1;
  /* margin: auto; */
  /* padding: 20px; */
  left: 37.5%;
  top: 30%;
  width: 30%;
  height: 50%;
  overflow: auto;
  background-color: white;
  border: 1px solid;
}
.group-todo-detail-modal > div:first-child{
  background-color: pink;
  margin: 0px;
  padding: 10px;
}
.group-todo-detail-modal-close {
  position: absolute;
  right: 0px;
  top: 0px;
}
.group-todo-detail-modal-close {
  position: absolute;
  right: 0px;
  top: 0px;
}
.group-todo-detail-modal-title {
  margin: 10px;
  border-bottom: 1px solid;
}
.group-todo-form-modal-content {
  padding: 10px;
}
.group-todo-form-modal-content > input {
  margin-top: 20px;
  margin-bottom: 20px;
}
.group-todo-form-modal-content-day {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}
.group-todo-form-modal-content-day > input {
  padding: 5px;
  margin: 10px;
}
.group-todo-form-modal-content > textarea {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 100px;
}
.group-todo-form-modal-btn {
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>