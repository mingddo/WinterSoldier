<template>
  <div>
    <!-- <input @keypress.enter="createTodo" v-model="todoTitle" type="text">
      <button @click="createTodo">Add</button> -->
    <div class="modify__modal" @click.self="closemodal">
      <div class="modal__card">
        <h2>{{ todo.id }}번 글입니다.</h2>

        <form @submit="OnSubmit" class="modal__todo__form">
          <div class="todo-title">
            알정 내용
            <input
              type="text"
              class="todo-input-title"
              v-model="form.title"
              placeholder="title"
            />
          </div>
          <div class="todo-scedule">
            <div class="todo-scedule-title">계획 시간</div>

            <select name="schedule_year" v-model="form.schedule_year">
              <option v-for="(year, id) in schedule_year_list" :key="id">
                {{ year }}
              </option>
            </select>
            <label class="select__label" for="year-select"> 년</label>
            <select name="schedule_month" v-model="form.schedule_month">
              <option v-for="(month, id) in schedule_month_list" :key="id">
                {{ month }}
              </option></select
            ><label class="select__label" for="month-select"> 월</label>
            <select name="schedule_date" v-model="form.schedule_date">
              <option v-for="(date, id) in schedule_date_list" :key="id">
                {{ date }}
              </option></select
            ><label class="select__label" for="date-select"> 일</label>
            <select name="schedule_hour" v-model="form.schedule_hour">
              <option v-for="(hour, id) in schedule_hour_list" :key="id">
                {{ hour }}
              </option></select
            ><label class="select__label" for="hour-select"> 시</label
            ><select name="schedule_min" v-model="form.schedule_min">
              <option v-for="(min, id) in schedule_min_list" :key="id">
                {{ min }}
              </option></select
            ><label class="select__label" for="minute-select"> 분</label>
          </div>
          <div class="todo-alarm">
            <div class="todo-alarm-title">알람 시간</div>
            <select name="alarm_year" v-model="form.alarm_year">
              <option v-for="(year, id) in alarm_year_list" :key="id">
                {{ year }}
              </option></select
            ><label class="select__label" for="ayear-select"> 년</label>
            <select name="alarm_month" v-model="form.alarm_month">
              <option v-for="(month, id) in alarm_month_list" :key="id">
                {{ month }}
              </option></select
            ><label class="select__label" for="amonth-select"> 월</label>
            <select name="alarm_date" v-model="form.alarm_date">
              <option v-for="(date, id) in alarm_date_list" :key="id">
                {{ date }}
              </option></select
            ><label class="select__label" for="adate-select"> 일</label>
            <select name="alarm_hour" v-model="form.alarm_hour">
              <option v-for="(hour, id) in alarm_hour_list" :key="id">
                {{ hour }}
              </option></select
            ><label class="select__label" for="ahour-select"> 시</label>
            <select name="alarm_min" v-model="form.alarm_min">
              <option v-for="(min, id) in alarm_min_list" :key="id">
                {{ min }}
              </option></select
            ><label class="select__label" for="aminute-select"> 분</label>
          </div>
          <div class="todo-submit" @click="OnSubmit" type="submit">
            수정하기
          </div>
        </form>
        <!-- <img
          src="../../assets/close.png"
          @click="$emit('modify-close-modal')"
          alt=""
          width="50px"
          height="30px"
          class="overlay-button"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ModifyTodo } from "../../api/todo.js";
export default {
  name: "Modify",
  props: {
    todo: Object,
  },
  data() {
    // const todono = Number(this.todo.id);
    // console.log(todono + "번 글입니다.");
    return {
      todono: this.todo.id,
      temp_todo: this.todo,
      form: {
        title: this.todo.title,
        schedule_year: this.todo.schedule_year,
        schedule_month: this.todo.schedule_month,
        schedule_date: this.todo.schedule_date,
        schedule_hour: this.todo.schedule_hour,
        schedule_min: this.todo.schedule_min,
        completed: this.todo.completed,
        id: this.todo.id,
        user_id: this.todo.user_id,
        alarm_year: this.todo.alarm_year,
        alarm_month: this.todo.alarm_month,
        alarm_date: this.todo.alarm_date,
        alarm_hour: this.todo.alarm_hour,
        alarm_min: this.todo.alarm_min,
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
    OnSubmit(event) {
      event.preventDefault();
      this.temp_todo = this.form;
      ModifyTodo(
        this.todono,
        this.temp_todo,
        () => {
          this.closemodal();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    closemodal() {
      this.$emit("modify-close-modal");
    },
    dataemit() {
      this.$emit("modify-data-emit", this.temp_todo);
    },
  },
  created() {
    this.temp_todo = this.todo;
  },
};
</script>

<style scoped src="@\assets\todomodify.css">
</style>
