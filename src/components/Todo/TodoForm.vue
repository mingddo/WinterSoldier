<template>
  <div>
    <!-- <input @keypress.enter="createTodo" v-model="todoTitle" type="text">
      <button @click="createTodo">Add</button> -->
    <div class="modal">
      <div class="overlay" @click="$emit('close-modal')"></div>
      <div class="modal-card">
        <form @submit="OnSubmit">
          <h4>
            제목을 입력하세요 :
            <input type="text" v-model="form.title" placeholder="title" />
          </h4>
          <h4>
            계획 시간
            <select name="schedule_year" v-model="form.schedule_year">
              <option v-for="(year, id) in schedule_year_list" :key="id">
                {{ year }}
              </option>
            </select>
            <select name="schedule_month" v-model="form.schedule_month">
              <option v-for="(month, id) in schedule_month_list" :key="id">
                {{ month }}
              </option>
            </select>
            <select name="schedule_date" v-model="form.schedule_date">
              <option v-for="(date, id) in schedule_date_list" :key="id">
                {{ date }}
              </option>
            </select>
            <select name="schedule_hour" v-model="form.schedule_hour">
              <option v-for="(hour, id) in schedule_hour_list" :key="id">
                {{ hour }}
              </option></select
            ><select name="schedule_min" v-model="form.schedule_min">
              <option v-for="(min, id) in schedule_min_list" :key="id">
                {{ min }}
              </option>
            </select>
          </h4>
          <br />
          <h4>
            알람 시간
            <select name="alarm_year" v-model="form.alarm_year">
              <option v-for="(year, id) in alarm_year_list" :key="id">
                {{ year }}
              </option>
            </select>
            <select name="alarm_month" v-model="form.alarm_month">
              <option v-for="(month, id) in alarm_month_list" :key="id">
                {{ month }}
              </option>
            </select>
            <select name="alarm_date" v-model="form.alarm_date">
              <option v-for="(date, id) in alarm_date_list" :key="id">
                {{ date }}
              </option>
            </select>
            <select name="alarm_hour" v-model="form.alarm_hour">
              <option v-for="(hour, id) in alarm_hour_list" :key="id">
                {{ hour }}
              </option></select
            ><select name="alarm_min" v-model="form.alarm_min">
              <option v-for="(min, id) in alarm_min_list" :key="id">
                {{ min }}
              </option>
            </select>
          </h4>
          <button type="submit">제출하기</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { writeTodo } from "../../api/todo.js";
export default {
  name: "TodoForm",
  data: function () {
    return {
      form: {
        title: "",
        schedule_year: "",
        schedule_month: "",
        schedule_date: "",
        schedule_hour: "",
        schedule_min: "",
        alarm_year: "",
        alarm_month: "",
        alarm_date: "",
        alarm_hour: "",
        alarm_min: "",
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
          // this.$router.push({ name: ""});
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
};
</script>

<style>
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