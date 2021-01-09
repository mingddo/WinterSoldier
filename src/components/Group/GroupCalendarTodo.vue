<template>
  <div>
    <span v-if="temp == true">
      <div class="monthcalendartodoItem"><i class="fas fa-bell"></i></div>
    </span>
  </div>
</template>

<script>
// import { readGroupTodo, } from "../../api/group.js";
import { mapState } from "vuex";

export default {
  name: "GroupCalendarTodo",
  props: {
    day: [Number, String],
    year: [Number, String],
    month: [Number, String],
    dates: Array,
    propstodos: Object,
  },
  data: function () {
    return {
      todos: null,
      dateInfo: null,
      temp: false,
      groupTodo: [],
      newDateInfo: null,
      p_todos: this.propstodos,
    };
  },
  methods: {
    createDateInfo() {
      let thismonth = this.month
      let thisday = this.day
      if (String(this.month).length === 1) {
        thismonth = "0" + String(this.month);
      }
      if (String(this.day).length === 1) {
        thisday = "0" + String(this.day);
      }
      this.dateInfo =
        String(this.year) + String(thismonth) + String(thisday);
    },
    getGroupTodoList () {
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
    dates () {
      this.createDateInfo();
      this.getGroupTodoList();
    },
    addTodo() {
      // console.log(this.newTodo, typeof this.todos)
      if (this.newTodo["schedule_year"] == this.year && this.newTodo["schedule_month"] == this.month && this.newTodo["schedule_date"] == this.day) {
        if (this.todos && this.todos.length == 0) {
          // console.log('새로생성')
          this.temp = true;
          console.log(this.temp)
        }
      }
      this.getGroupTodoList();
    },
    propstodos() {
      this.p_todos = this.propstodos;
      this.getGroupTodoList();
    },
  },

  created() {
    this.createDateInfo();
  },
  computed: {
    ...mapState({
      addTodo: (state) => state.groupTodoStore.addTodo,
      newTodo: (state) => state.groupTodoStore.newTodo,
    }),
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