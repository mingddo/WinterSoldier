<template>
  <div>
    <!-- <input @keypress.enter="createTodo" v-model="todoTitle" type="text">
      <button @click="createTodo">Add</button> -->
    <div class="modal">
      <div class="modal-card container pd">
        <form @submit="OnSubmit" class="todo-form pd">
          <h4>
            제목을 입력하세요 : <br />
            <input
              type="text"
              class="todo-input-title pd"
              v-model="form.title"
              placeholder="title"
            />
          </h4>
          <h4 class="pd">
            계획 시간 : <br />
            <select name="schedule_year" v-model="form.schedule_year">
              <option v-for="(year, id) in schedule_year_list" :key="id">
                {{ year }}
              </option></select
            >년
            <select name="schedule_month" v-model="form.schedule_month">
              <option v-for="(month, id) in schedule_month_list" :key="id">
                {{ month }}
              </option></select
            >월
            <select name="schedule_date" v-model="form.schedule_date">
              <option v-for="(date, id) in schedule_date_list" :key="id">
                {{ date }}
              </option></select
            >일
            <select name="schedule_hour" v-model="form.schedule_hour">
              <option v-for="(hour, id) in schedule_hour_list" :key="id">
                {{ hour }}
              </option></select
            >시간<select name="schedule_min" v-model="form.schedule_min">
              <option v-for="(min, id) in schedule_min_list" :key="id">
                {{ min }}
              </option></select
            >분
          </h4>
          <br />
          <h4 class="pd">
            알람 시간 : <br />
            <select name="alarm_year" v-model="form.alarm_year">
              <option v-for="(year, id) in alarm_year_list" :key="id">
                {{ year }}
              </option></select
            >년
            <select name="alarm_month" v-model="form.alarm_month">
              <option v-for="(month, id) in alarm_month_list" :key="id">
                {{ month }}
              </option></select
            >월
            <select name="alarm_date" v-model="form.alarm_date">
              <option v-for="(date, id) in alarm_date_list" :key="id">
                {{ date }}
              </option></select
            >일
            <select name="alarm_hour" v-model="form.alarm_hour">
              <option v-for="(hour, id) in alarm_hour_list" :key="id">
                {{ hour }}
              </option></select
            >시간
            <select name="alarm_min" v-model="form.alarm_min">
              <option v-for="(min, id) in alarm_min_list" :key="id">
                {{ min }}
              </option></select
            >분
          </h4>
          <button type="submit">제출하기</button>
        </form>
        <div @click="$emit('close-modal')">
          <img
            class="overlay-button"
            src="../../assets/close.png"
            width="50px"
            height="30px"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { writeTodo } from "../../api/todo.js";
export default {
  name: "TodoForm",
  props: {
    propsyear: [String, Number],
    propsmonth: [String, Number],
    propsday: [String, Number],
  },
  data: function () {
    return {
      form: {
        title: "일정을 넣으세요",
        schedule_year: "2021",
        schedule_month: "01",
        schedule_date: "01",
        schedule_hour: "00",
        schedule_min: "00",
        alarm_year: "2021",
        alarm_month: "01",
        alarm_date: "01",
        alarm_hour: "00",
        alarm_min: "00",
      },
      schedule_year_list: [
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
      ],
      schedule_month_list: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      schedule_date_list: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      schedule_hour_list: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      schedule_min_list: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
      ],
      alarm_year_list: [
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
      ],
      alarm_month_list: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      alarm_date_list: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      alarm_hour_list: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      alarm_min_list: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
      ],
    };
  },
  methods: {
    OnSubmit: function () {
      event.preventDefault();
      writeTodo(
        this.form,
        console.log("확인"),
        this.$emit("close-modal"),
        () => {
          console.log(this.form),
            console.log(`jwt ${localStorage.getItem("jwt")}`);
          this.$store.dispatch("addTodoList", this.form);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    createTodo: function () {
      // console.log('create')
      const todoItem = {
        title: this.todoTitle,
        completed: false,
      };
      // this.$store.commit('CREATE_TODO',todoItem)
      this.$store.dispatch("create_todo", todoItem);
      this.todoTitle = "";
    },
  },
  created() {
    this.form.schedule_year = this.propsyear;
    this.form.schedule_month = this.propsmonth;
    this.form.schedule_date = this.propsday;
    this.form.alarm_year = this.propsyear;
    this.form.alarm_month = this.propsmonth;
    this.form.alarm_date = this.propsday;
}
  computed: {
    ...mapState({
      today_alarm_todos: (state) => state.todoStore.today_alarm_todos,
    }),
  },
};
</script>

<style>
.modal {
  width: 30%;
  position: fixed;
  height: 100px;
  left: 0;
  top: 0;
  color: white;
}
.modal-card {
  position: relative;
  max-width: 400px;
  height: 10px;
  margin: 30px;
  margin-top: 30px;
  padding: 20px;
  background-color: black;
  z-index: 10;
  opacity: 1;
}
.overlay-button {
  direction: column;
  justify-content: flex-end;
}

.todo-input {
  width: 20px;
  margin: 3px;
  padding: 3px;
  height: 20px;
  border: 1px solid black;
  background-color: black;
  color: white;
}
.todo-input-year {
  width: 50px;
  height: 20px;
  padding: 0px;
  border: 1px solid white;
  background-color: black;
  color: white;
}
.todo-input-title {
  width: 200px;
  margin: 3px;
  padding: 0px;
  height: 20px;
  border: 1px solid white;
  background-color: black;
  color: white;
}
.container {
  position: fixed;
  box-shadow: 0px 0px 10px 0.3px var(--light-gray);
  border: none;
  top: 20%;
  left: 40%;
}
.todo-form {
  margin-top: 20%;
  height: 300px;
  direction: column;
  text-align: center;
}
.pd {
  padding: 10px;
}
</style>
