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
    year: Number,
    month: Number,
    weekCalendar: Array,
  },
  data: function () {
    return {
      todos: null,
      dateInfo: null,
      temp: true,
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
        String(this.year) + String(this.month) + String(this.weekdaily);
    },
    getTodoList() {
      todoList(
        (response) => {
          console.log("todolist!!", response.data.todolist[this.dateInfo]);
          console.log("============", this.dateInfo);
          if (this.dateInfo in response.data.todolist) {
            this.todos = response.data.todolist[this.dateInfo];
            this.temp = true;
          } else {
            this.todos = [];
            this.temp = false;
            console.log("안들어오는 것", this.todos);
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
        String(this.year) + String(this.month) + String(this.weekdaily);
      this.getTodoList();
    },
  },

  created() {
    console.log("created!!!!!!");
    this.createDateInfo();
    this.getTodoList();
  },
};
</script>

<style></style>
