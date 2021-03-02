<template>
  <div>
    <span v-show="temp">
      <!-- <Todo v-for="(todo, idx) in todos" :key="idx" :todo="todo" /> -->
      <div v-for="todo in todos" :key="todo.id" class="monthcalendartodoItem">
        <Temp :todo="todo"> </Temp>
      </div>
    </span>
  </div>
</template>

<script>
import Temp from "./Temp";
// import { todoList } from "../../api/todo.js";
export default {
  name: "TodoList",
  components: {
    Temp,
  },
  props: {
    weekdaily: [Number, String],
    year: [Number, String],
    month: [Number, String],
    weekCalendar: Array,
    propstodos: Object,
  },
  data: function () {
    return {
      todos: null,
      dateInfo: null,
      temp: true,
      t_month: null,
      t_weekdaily: null,
      p_todos: null,
    };
  },
  methods: {
    createDateInfo() {
      if (String(this.month).length === 1) {
        this.t_month = "0" + String(this.month);
      } else {
        this.t_month = this.month;
      }
      if (String(this.weekdaily).length === 1) {
        this.t_weekdaily = "0" + String(this.weekdaily);
      } else {
        this.t_weekdaily = this.weekdaily;
      }
      this.dateInfo =
        String(this.year) + String(this.t_month) + String(this.t_weekdaily);
    },
    getTodoList() {
      if (this.dateInfo in this.p_todos) {
        this.todos = this.p_todos[this.dateInfo];
        this.temp = true;
      } else {
        this.todos = [];
        this.temp = false;
      }
    },
  },

  watch: {
    weekCalendar() {
      if (String(this.month).length === 1) {
        this.t_month = "0" + String(this.month);
      } else {
        this.t_month = this.month;
      }
      if (String(this.weekdaily).length === 1) {
        this.t_weekdaily = "0" + String(this.weekdaily);
      } else {
        this.t_weekdaily = this.weekdaily;
      }
      this.dateInfo =
        String(this.year) + String(this.t_month) + String(this.t_weekdaily);
      this.getTodoList();
    },
    propstodos:{
      deep :true,
      handler(newtodo){
      console.log('바뀐다',newtodo)
      this.p_todos = this.propstodos;
      this.getTodoList();
      }
    },

  },
  created() {
    this.createDateInfo();
  },
};
</script>

<style></style>
