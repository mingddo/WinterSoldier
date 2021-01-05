<template>
  <div>
    <div>
      <GroupTodoDetail
      v-for="todo in todayinfo" 
      :key="todo.id"
      :todo="todo"
      class="group-todo-item"
      @deleteTodoList="deleteTodoList"
      />
    </div>
    <div>
      <img @click="openTodoform" class="pointer" src="https://img.icons8.com/pastel-glyph/64/000000/plus--v2.png"/>
    </div>
    <div v-if="newtodo">
      <GroupTodoForm 
      :day="day"
      :month="month"
      :year="year"
      :groupinfo="groupinfo"
      @NewTodo="NewTodo"
      @closeTodoform="closeTodoform"
      />
    </div>
  </div>
</template>

<script>
import { readGroupTodo, } from "../../api/group.js";
import GroupTodoDetail from './GroupTodoDetail.vue'
import GroupTodoForm from './GroupTodoForm.vue'
export default {
  name: "GroupTodayTodoList",
  components: {
    GroupTodoDetail,
    GroupTodoForm
  },
  props: {
    day: Number,
    year: Number,
    month: Number,
  },
  computed: {
    
  },
  data: function () {
    return {
      newtodo: false,
      todoexist: false,
      todayinfo: [],
      groupinfo: {},
      groupTodo: {},
      today: null,
      isModalViewed: false,
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
    deleteTodoList (id) {
      let idx = this.todayinfo.findIndex(obj => {
        obj.id == id
      })
      this.todayinfo.splice(idx, 1)
    },
    closeTodoform () {
      this.newtodo = false;
    },
    NewTodo (form) {
      console.log('지금', typeof this.todayinfo, this.todayinfo)
      if (form.schedule_year == this.year && form.schedule_month == this.month && form.schedule_date == this.day) {
        if (this.todayinfo != []) {
          console.log('폼', form)
          this.todayinfo.push(form)
        }
      }
      this.newtodo = false;
      this.getGroupTodoList();
    },
    openTodoform () {
      this.newtodo = true;
    },
    getTodayList () {
      for (let keydate in this.groupTodo) {
        if (this.dateInfo == keydate) {
          this.todayinfo = this.groupTodo[keydate]
          this.todoexist = true;
          break;
        } else {
          this.todayinfo = [];
        }
      }
    },
    getGroupTodoList () {
      const getgroupInfo = sessionStorage.getItem('group')
      this.groupinfo = JSON.parse(getgroupInfo)
      readGroupTodo(
        this.$route.query.groupid,
        (res) => {
          this.groupTodo = res.data.todolist
          this.getTodayList();
        },
        (err) => {
          console.log(err)
        }
      )
    },
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
  },
  watch: {
    day() {
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
.group-todo-item {
  /* box-shadow: 0px 0px 10px 0.3px var(--color-gray-light); */
  border: none;
  /* border-radius: 15px; */
  background-color: var(--color-gray);
  margin: 10px;
  padding: 10px;
  border-bottom: 1px solid var(--color-gray-light);
}
</style>