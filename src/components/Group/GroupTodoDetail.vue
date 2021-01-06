<template>
  <div>
    <div>
      <h3 class="pointer" @click="openmodal">{{ todo.title }}</h3>
    </div>
    <div class="group-todo-detail-modal" :class="{modal:!detail}">
      <div>
        <h1 :class="{changeForm:ismodified}">DETAIL</h1>
        <h1 :class="{changeForm:!ismodified}">MODIFY</h1>
      </div>
      <div class="group-todo-detail-modal-close">
        <img
          class="pointer"
          @click="openmodal"
          src="https://img.icons8.com/ios/50/000000/close-window.png" />
      </div>
      <div class="group-todo-detail-modal-title">
        <h1 :class="{changeForm:ismodified}">{{ todo.title }}</h1>
        <input :class="{changeForm:!ismodified}" type="text" v-model.trim="todo.title">
      </div>
      <div>
        <h4 :class="{changeForm:ismodified}">
          {{ todo.schedule_year}} 년 
          {{ todo.schedule_month }} 월 
          {{ todo.schedule_date }} 일
          {{ todo.schedule_hour}} 시
          {{ todo.schedule_min}} 시
        </h4>
        <div :class="{changeForm:!ismodified}">
          <div class="group-todo-modify-modal-content-day">
            <input type="number" v-model="todo.schedule_year">년
            <input type="number" v-model="todo.schedule_month" min="1" max="12">월
            <input type="number" v-model="todo.schedule_date" min="1" max="31">일
          </div>
          <div class="group-todo-modify-modal-content-hour">
            <input type="number" v-model="todo.schedule_hour" min="0" max="23">시
            <input type="number" v-model="todo.schedule_min" min="0" max="59">분
          </div>
        </div>
      </div>
      <div class="group-todo-detail-modal-content" >
          <p :class="{changeForm:ismodified}">{{ todo.content }}</p>
          <textarea class="group-todo-modify-modal-content-text" v-model="todo.content" :class="{changeForm:!ismodified}"></textarea>
      </div>
      <div class="group-todo-detail-modal-button">
        <img :class="{changeForm:ismodified}" class="pointer" @click="changemodified" src="https://img.icons8.com/ios-glyphs/48/000000/edit--v4.png"/>
        <img :class="{changeForm:ismodified}" class="pointer" @click="deleteTodo" src="https://img.icons8.com/ios-glyphs/48/000000/erase.png"/>
        <img :class="{changeForm:!ismodified}" @click="modifyTodo" class="pointer" src="https://img.icons8.com/material-sharp/48/000000/ok--v2.png">
      </div>

    </div>
  </div>
</template>

<script>
import { updateGroupTodo } from '../../api/group';
import { deleteGroupTodo } from '../../api/group';

export default {
  props: {
    todo: Object,
  },
  data () {
    return {
      detail: false,
      ismodified: false,
    }
  },
  methods: {
    deleteTodo() {
      deleteGroupTodo(
        this.$route.query.groupid,
        this.todo.id,
        this.todo,
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
      this.detail = !this.detail;
      this.$emit('deleteTodoList', this.todo.id)
    },
    modifyTodo () {
      updateGroupTodo(
        this.$route.query.groupid,
        this.todo.id,
        this.todo,
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
      this.ismodified = false;
    },
    changemodified () {
      this.ismodified = true;
    },
    openmodal () {
      this.detail = !this.detail;
      this.modified = true
    },
  }
}
</script>

<style>
.modal {
  display: none;
}
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
.group-todo-detail-modal-title {
  margin: 10px;
  border-bottom: 1px solid;
}
.group-todo-detail-modal-content {
  display: flex;
  margin: 10px;
  padding: 10px;
  height: 50%;
  border: 1px solid;
  border-radius: 5px;
  overflow: auto;
  /* box-shadow: 0px 0px 10px 0.3px var(--color-gray-light); */
  background-color: var(--color-white);
}
.group-todo-detail-modal-button {
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
}
.changeForm {
  display:none;
}
.group-todo-modify-modal-content-day {
  display: flex;
  padding: 10px;
  margin: 10px;
  justify-content: space-evenly;
}
.group-todo-modify-modal-content-day input {
  margin: 5px;
  padding: 5px;
}
.group-todo-modify-modal-content-hour {
  display: flex;
  padding: 10px;
  margin: 10px;
  justify-content: space-evenly;
}
.group-todo-modify-modal-content-hour input {
  margin: 10px;
  padding: 5px;
}
.group-todo-modify-modal-content-text {
  width: 100%;
  padding: 10px;
  text-align: left;
}
</style>