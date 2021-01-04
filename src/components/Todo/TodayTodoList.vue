<template>
  <div>
    <div class="tf-dailytodoList">
      <div class="td-dailytodoItem">
        <div @click="isModalViewed = true">+</div>
        <TodoForm
          :propsyear="year"
          :propsmonth="p_month"
          :propsday="p_day"
          v-if="isModalViewed"
          @close-modal="isModalViewed = false"
        />
      </div>
    </div>
    <span v-show="temp">
      <div v-for="todo in todos" :key="todo.id" class="monthcalendartodoItem">
        <div @click="isTodoModalViewed = true">
          <div>{{ todo.title }}</div>
          <div>{{ todo.alarm_hour }}시 {{ todo.alarm_min }}분</div>
          <Detail
            :todo="todo"
            v-if="isTodoModalViewed"
            @close-modal="isTodoModalViewed = false"
          >
          </Detail>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import { todoList } from "../../api/todo.js";
import Detail from "./Detail";
import TodoForm from "../Todo/TodoForm";
export default {
  name: "TodayTodoList",
  components: {
    Detail,
    TodoForm,
  },
  props: {
    day: Number,
    year: Number,
    month: Number,
  },
  data: function () {
    return {
      isModalViewed: false,
      isTodoModalViewed: false,
      todos: null,
      dateInfo: null,
      temp: false,
      c_month: null,
      c_day: null,
      p_month: null,
      p_day: null,
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
    day() {
      if (0 < this.month < 10) {
        this.p_month = "0" + String(this.month);
      } else {
        this.p_month = String(this.month);
      }
      if (0 < this.day < 10) {
        if (String(this.day).length === 1) {
          this.p_day = "0" + String(this.day);
        } else {
          this.p_day = String(this.day);
        }
      } else {
        this.p_day = String(this.day);
      }
      this.dateInfo =
        String(this.year) + String(this.p_month) + String(this.p_day);
      this.getTodoList();
    },
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
  padding: 10px;
  color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0.3px var(--light-gray);
  border: none;
  background-color: rgb(104, 83, 99);
}
.monthcalendartodoItem:hover {
  background-color: rgb(76, 132, 179);
}

.completed {
  text-decoration: line-through;
}
.modal,
.overlay {
  width: 75%;
  height: 75%;
  position: fixed;
  left: 0;
  top: 0;
  color: white;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: rgb(240, 240, 175);
  min-height: 500px;
  z-index: 10;
  opacity: 1;
}
</style>