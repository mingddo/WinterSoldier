<template>
  <div>
    <div class="tf-dailytodoList">
      <div class="td-dailytodoItem">
        <div @click="isModalViewed = true">+</div>
        <TodoForm
          :propsyear="year"
          :propsmonth="c_month"
          :propsday="c_day"
          v-if="isModalViewed"
          @close-modal="isModalViewed = false"
        />
      </div>
    </div>
    <span v-show="temp">
      <div v-for="todo in todos" :key="todo.id" class="monthcalendartodoItem">
        <div>
          <div @click="TodoModalViewed">{{ todo.title }}</div>
          <div @click="TodoModalViewed">
            {{ todo.alarm_hour }}시 {{ todo.alarm_min }}분
          </div>
          <Detail :todo="todo" v-if="isTodoModalViewed2"> </Detail>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  computed: {
    isTodoModalViewed2() {
      return this.$store.state.isTodoModalViewed;
    },
    ...mapState({
      changeTodo: (state) => state.todoStore.changeTodo,
      newTodo: (state) => state.todoStore.newTodo,
    }),
  },
  data: function () {
    return {
      isModalViewed: false,
      todos: null,
      dateInfo: null,
      temp: false,
      c_month: null,
      c_day: null,
    };
  },
  methods: {
    TodoModalViewed() {
      this.$store.dispatch("isTodoModaViewed");
    },
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
      if (localStorage.getItem("jwt")) {
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
      } else {
        this.todos = [];
        this.temp = false;
      }
    },
  },
  watch: {
    day() {
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
  created() {
    this.createDateInfo();
    this.getTodoList();
  },
};
</script>

<style scoped>
.todaytodoItemeach {
  width: 100%;
  margin: 10px auto;
}

.todositemspan {
  width: 100%;
}

.monthcalendartodoItem {
  width: 100%;
  padding: 10px;
  color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0.3px #bebebe;
  border: none;
  background-color: rgb(165, 16, 130);
}
.monthcalendartodoItem:hover {
  background-color: rgb(76, 132, 179);
}

.completed {
  text-decoration: line-through;
}
</style>