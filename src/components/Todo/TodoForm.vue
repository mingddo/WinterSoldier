<template>
  <div class="c__modal" @click.self="$emit('close-modal')">
    <div class="modal__card">
      <!-- <div @click="$emit('close-modal')">
        <img
          class="modal__close__button"
          src="../../assets/close.png"
        />
      </div> -->
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
        <div class="todo-submit" @click="OnSubmit" type="submit">제출하기</div>
      </form>
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
        title: "",
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
      if (
        this.form.title === null ||
        this.form.title === "" ||
        this.form.title === "undefined"
      ) {
        alert("일정을 입력하세요");
        return;
      } else {
        writeTodo(
          this.form,
          () => {
            this.$emit("close-modal"),
              this.$store.commit("todoStore/addNewTodo", this.form);
          },
          (error) => {
            console.log(error);
          }
        );
      }
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
  },
  computed: {
    ...mapState({
      today_alarm_todos: (state) => state.todoStore.today_alarm_todos,
      newTodo: (state) => state.todoStore.newTodo,
    }),
  },
};
</script>

<style scoped src="@\assets\todoform.css">
</style>
