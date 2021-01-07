<template>
  <div id="app">
    <ChatHome />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import ChatHome from "./components/ChatBot/ChatHome.vue";
// import Navi from "./components/common/navi.vue";
import { todoCompleted } from "@/api/todo.js";
import { todoList } from "@/api/todo.js";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    // Navi,
    ChatHome,
  },
  data: function () {
    return {
      today_alarm_todos: [],
      today_notAlarm_todos: [],
      curTime_info: null,
    };
  },
  methods: {
    checkAlarm() {
    //   if (this.today_notAlarm_todos.length > 0) {
    //     if (Notification.permission === "granted") {
    //       let img =
    //         "https://i.annihil.us/u/prod/marvel/i/mg/6/00/5c802b62bc572/clean.jpg";
    //       var i;
    //       let today_notAlarm_todos_title = "";
    //       for (i = 0; i < this.today_notAlarm_todos.length; i++) {
    //         today_notAlarm_todos_title +=
    //           this.today_notAlarm_todos[i].title + ", ";
    //         // db의 todo completed여부도 변경, id값없어서 db의 completed가 안변하는 에러
    //         todoCompleted(
    //           { ...this.today_notAlarm_todos[i], completed: "yes" },
    //           () => {
    //             this.$store.commit("todoStore/isCompleted", i); // 알람띄운 todo는 completed 변경
    //           },
    //           (err) => {
    //             console.log(err);
    //           }
    //         );
    //       }
    //       let text = today_notAlarm_todos_title;
    //       new Notification(
    //         this.today_notAlarm_todos.length + "개의 시간 지난 할 일",
    //         { body: text, icon: img }
    //       );
    //     } else {
    //       alert(
    //         "알림시간이 지난 할 일이" +
    //           this.today_notAlarm_todos.length +
    //           "개 있어요!"
    //       );
    //     }
    //   }
    //   setInterval(() => {
    //     const day = new Date();
    //     let cur_hour = this.addZeros(day.getHours(), 2);
    //     let cur_minute = this.addZeros(day.getMinutes(), 2);
    //     let today_alarm_todos_length = this.today_alarm_todos.length;
    //     this.curTime_info = cur_hour + cur_minute;
    //     var i;
    //     for (i = 0; i < today_alarm_todos_length; i++) {
    //       let alarmTime_info =
    //         this.today_alarm_todos[i].alarm_hour +
    //         this.today_alarm_todos[i].alarm_min;
    //       if (
    //         this.curTime_info === alarmTime_info &&
    //         this.today_alarm_todos[i].completed === "no"
    //       ) {
    //         // 지원 여부 확인 및 알람 띄우기
    //         if (!("Notification" in window)) {
    //           alert("Notification을 지원하지 않는 브라우저입니다.");
    //         } else if (Notification.permission === "granted") {
    //           let img =
    //             "https://i.annihil.us/u/prod/marvel/i/mg/6/00/5c802b62bc572/clean.jpg";
    //           let text = this.today_alarm_todos[i].title + " 할 시간.";
    //           new Notification("할 일", { body: text, icon: img }); // 알람

    //           this.today_alarm_todos[i].completed = "yes"; // 알람띄운 todo는 completed 변경
    //           // db의 todo completed여부도 변경
    //           todoCompleted(
    //             { ...this.today_alarm_todos[i], completed: "yes" },
    //             () => {
    //               console.log("completed 수정 성공");
    //             },
    //             (err) => {
    //               console.log(err);
    //             }
    //           );
    //         }
    //       }
    //     }
    //   }, 1000);
    // },
    getTodo: function () {
      const day = new Date();
      let cur_year = day.getFullYear();
      let cur_month = this.addZeros(day.getMonth() + 1, 2);
      let cur_day = this.addZeros(day.getDate(), 2);
      let cur_hour = this.addZeros(day.getHours(), 2);
      let cur_minute = this.addZeros(day.getMinutes(), 2);
      let today_info = cur_year.toString() + cur_month + cur_day;
      let time_info = cur_hour + cur_minute;
      todoList(
        (res) => {
          if (res.data.todolist[today_info]) {
            let today_todos = res.data.todolist[today_info];
            let today_todos_length = today_todos.length;
            var i;
            for (i = 0; i < today_todos_length; i++) {
              let todo_time_info =
                today_todos[i]["alarm_hour"] + today_todos[i]["alarm_min"];
              if (
                today_todos[i]["completed"] === "no" &&
                todo_time_info < time_info
              ) {
                this.today_notAlarm_todos.push(today_todos[i]);
              } else {
                this.today_alarm_todos.push(today_todos[i]);
              }
            }
            this.checkAlarm();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 권한 획득 (알람 허용 여부 물어보기)
    // prtmiddion은 denied, granted, default 세 종류 있고 처음엔 default
    // default 값이면 requestPermission()을 사용하여 권한 요청
    askNotificationPermission: function () {
      if (Notification.permission === "default") {
        Notification.requestPermission().then(console.log("알림허용성공")); // 원래 여기서 permission이 denied인지 granted인지 비교해야하지만, 사용자가 무조건 허용한다는 전제로 넘어감.
      } else {
        console.log("이미 알림허용돼있다");
      }
    },
    addZeros: function (num, digit) {
      // 자릿수 맞춰주기
      var zero = "";
      num = num.toString();
      if (num.length < digit) {
        var i;
        for (i = 0; i < digit - num.length; i++) {
          zero += "0";
        }
      }
      return zero + num;
    },
  },
  mounted() {
    this.askNotificationPermission();
    if (this.isLogin) {
      this.getTodo();
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userStore.userInfo,
      isLogin: (state) => state.userStore.isLogin,
      changeAlarm: (state) => state.todoStore.changeAlarm,
      newAlarm: (state) => state.todoStore.newAlarm,
    }),
  },
  watch: {
    changeAlarm() {
      let alarmTime_info =
        this.newAlarm["alarm_hour"] + this.newAlarm["alarm_min"];
      if (alarmTime_info < this.curTime_info) {
        this.today_notAlarm_todos.push(this.newAlarm);
      } else {
        this.today_alarm_todos.push(this.newAlarm);
      }
      this.checkAlarm();
    },
  },
};
</script>

<style></style>
