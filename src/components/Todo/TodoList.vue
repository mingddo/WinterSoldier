<template>
  <div>
    <span v-show="temp">
      <Todo v-for="(todo, idx) in todos" :key="idx" :todo="todo" />
    </span>
  </div>
</template>

<script>
import Todo from "./Todo";
import { todoList } from "../../api/todo.js";
export default {
  name: "TodoList",
  components: {
    Todo,
  },
  props: {
    weekdaily: [Number, String],
    year: [Number, String],
    month: [Number, String],
    weekCalendar: Array,
  },
  data: function () {
    return {
      todos: null,
      dateInfo: null,
      temp: true,
      t_month: null,
      t_weekdaily: null,
    };
  },
  methods: {
    createDateInfo() {
      if (0 < this.month < 10) {
        this.t_month = "0" + String(this.month);
      } else {
        this.t_month = this.month;
      }
      if (0 < this.weekdaily < 10) {
        this.t_weekdaily = "0" + String(this.weekdaily);
      } else {
        this.t_weekdaily = this.weekdaily;
      }
      this.dateInfo =
        String(this.year) + String(this.t_month) + String(this.t_weekdaily);
    },
    getTodoList() {
      todoList(
        (response) => {
          if (this.dateInfo in response.data.todolist) {
            this.todos = response.data.todolist[this.dateInfo];
            this.temp = true;
          } else {
            this.todos = [];
            this.temp = false;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },

  watch: {
    weekCalendar() {
      if (0 < this.month < 10) {
        this.t_month = "0" + String(this.month);
      } else {
        this.t_month = this.month;
      }
      if (0 < this.weekdaily < 10) {
        this.t_weekdaily = "0" + String(this.weekdaily);
      } else {
        this.t_weekdaily = this.weekdaily;
      }
      this.dateInfo =
        String(this.year) + String(this.t_month) + String(this.t_weekdaily);
      this.getTodoList();
    },
  },

  created() {
    this.createDateInfo();
    this.getTodoList();
  },
};
</script>

<style></style>
