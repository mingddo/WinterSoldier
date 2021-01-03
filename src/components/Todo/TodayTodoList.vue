<template>
  <div>
    <span v-show="temp">
      <div class="monthcalendartodoItem">{{ todos }}</div>
    </span>
  </div>
</template>

<script>
import { todoList } from "../../api/todo.js";
export default {
  name: "TodayTodoList",
  props: {
    day: [Number, String],
    year: [Number, String],
    month: [Number, String],
  },
  data: function () {
    return {
      todos: null,
      dateInfo: null,
      temp: false,
      c_month: null,
      c_day: null,
    };
  },
  methods: {
    createDateInfo() {
      if (0 < this.month < 10) {
        this.c_month = "0" + String(this.month);
      } else {
        this.c_month = String(this.month);
      }
      if (0 < this.day < 10) {
        this.c_day = "0" + String(this.day);
      } else {
        this.c_day = String(this.day);
      }
      this.dateInfo =
        String(this.year) + String(this.c_month) + String(this.c_day);
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
    dates() {
      if (0 < this.month < 10) {
        this.c_month = "0" + String(this.month);
      } else {
        this.c_month = String(this.month);
      }
      if (0 < this.day < 10) {
        this.c_day = "0" + String(this.day);
      } else {
        this.c_day = String(this.day);
      }
      this.dateInfo =
        String(this.year) + String(this.c_month) + String(this.c_day);
      this.getTodoList();
    },
  },
  created() {
    this.createDateInfo();
    this.getTodoList();
    console.log(this.day, this.month, this.year);
  },
};
</script>

<style scoped>
.monthcalendartodoItem {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0.3px var(--light-gray);
  border: none;
  background-color: rgb(104, 83, 99);
}
</style>