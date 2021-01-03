<template>
  <div>
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
export default {
  name: "TodayTodoList",
  components: {
    Detail,
  },
  props: {
    day: [Number, String],
    year: [Number, String],
    month: [Number, String],
  },
  data: function () {
    return {
      isTodoModalViewed: false,
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
    day() {
      console.log("여기");
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
    console.log("TodayTodoList created hook", this.day, this.month, this.year);
    this.createDateInfo();
    this.getTodoList();
  },
};
</script>

<style scoped>
.monthcalendartodoItem {
  width: 100%;
  margin: 10px auto;
  padding: 20px;
  color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0.3px var(--light-gray);
  border: none;
  background-color: rgb(104, 83, 99);
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