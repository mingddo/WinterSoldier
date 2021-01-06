<template>
  <div>
    <span v-show="temp">
      <div class="monthcalendartodoItem"><i class="fas fa-bell"></i></div>
    </span>
  </div>
</template>

<script>
import { readGroupTodo, } from "../../api/group.js";
export default {
  name: "GroupCalendarTodo",
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
      groupinfo: {},
      groupTodo: [],
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
      readGroupTodo(
        this.$route.query.groupid,
        (res) => {
          if (this.dateInfo in res.data.todolist) {
            this.groupTodo = res.data.todolist[this.dateInfo]
            this.temp = true;
          } else {
            this.groupTodo = [];
            this.temp = false;
          }
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },

  watch: {
    dates() {
      this.createDateInfo();
      this.getGroupTodoList();
    },
  },

  created() {
    this.createDateInfo();
    this.getGroupTodoList();
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