<template>
  <div>
    <span v-show="temp">
      <div class="monthcalendartodoItem"><i class="fas fa-bell"></i></div>
    </span>
  </div>
</template>

<script>
import { todoList } from "../../api/todo.js";
import { mapState } from "vuex";
export default {
  name: "TodoList",
  props: {
    day: [Number, String],
    year: [Number, String],
    month: [Number, String],
    dates: Array,
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
      if (String(this.month).length === 1) {
        this.c_month = "0" + String(this.month);
      } else {
        this.c_month = String(this.month);
      }
      if (String(this.day).length === 1) {
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
      if (String(this.month).length === 1) {
        this.c_month = "0" + String(this.month);
      } else {
        this.c_month = String(this.month);
      }
      if (String(this.day).length === 1) {
        this.c_day = "0" + String(this.day);
      } else {
        this.c_day = String(this.day);
      }
      this.dateInfo =
        String(this.year) + String(this.c_month) + String(this.c_day);
      this.getTodoList();
    },
    changeTodo() {
      let newDateInfo =
        this.newTodo["alarm_year"] +
        this.newTodo["alarm_month"] +
        this.newTodo["alarm_date"];
      if (newDateInfo === this.dateInfo) {
        if (this.todos.length > 0) {
          this.todos.push(this.newTodo);
        } else {
          // this.todos = [this.newTodo];이거해도 동기화반영이 안된다.
          this.getTodoList();
        }
      }
    },
  },
  computed: {
    ...mapState({
      changeTodo: (state) => state.todoStore.changeTodo,
      newTodo: (state) => state.todoStore.newTodo,
    }),
  },
  created() {
    this.createDateInfo();
    this.getTodoList();
  },
};
</script>

<style scoped>
.monthcalendartodoItem {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0.3px var(--light-gray);
  border: none;
  background-color: rgb(189, 8, 150);
}
</style>