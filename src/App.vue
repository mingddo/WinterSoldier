<template>
  <div id="app">
    <Navi />
    <ChatHome />
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import ChatHome from './components/ChatBot/ChatHome.vue';
import Navi from './components/common/navi.vue';
import { todoList, todoCompleted } from "@/api/todo.js";
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Navi,
    ChatHome
  },
  data() {
    return {
      today_todos: [],
      today_last_todos: [], // 시간이 지난 todo
      todos: [],
      cnt: 0
    };
  },
  methods: {
    checkAlarm() {
      if (this.today_last_todos.length > 0) {
        if (Notification.permission === "granted") {
              let img = 'https://i.annihil.us/u/prod/marvel/i/mg/6/00/5c802b62bc572/clean.jpg'
              var i;
              let today_last_todos_title = ''
              for (i=0; i < this.today_last_todos.length; i++) {
                today_last_todos_title += this.today_last_todos[i].title + ', '
                this.today_todos[i].completed = "yes" // 알람띄운 todo는 completed 변경
                // db의 todo completed여부도 변경
                todoCompleted ({...this.today_last_todos[i], completed: "yes"},
                () => {
                  console.log('지나간 알림 completed 수정 성공')
                },
                (err) => {
                  console.log(err)
                });
              }
              let text = today_last_todos_title
              new Notification(this.today_last_todos.length + '개의 시간 지난 할 일', { body: text, icon: img }) 
        } else {
          alert('알림시간이 지난 할 일이' + this.today_last_todos.length +'개 있어요!')
        }
      }
      setInterval(()=>{
        const day = new Date();
        let cur_hour = day.getHours();
        let cur_minute = day.getMinutes();
        var i;
        for (i=0; i < this.today_todos.length; i++) {
          console.log('i랑 today_todos완료여부', i, this.today_todos[i].completed)
          if(this.today_todos[i].alarm_hour === cur_hour && this.today_todos[i].alarm_min === cur_minute && this.today_todos[i].completed === "no"){
            // 지원 여부 확인 및 알람 띄우기
            if (!("Notification" in window)) {
                  alert("Notification을 지원하지 않는 브라우저입니다.")
                }
            else if (Notification.permission === "granted") {
              let img = 'https://i.annihil.us/u/prod/marvel/i/mg/6/00/5c802b62bc572/clean.jpg'
              let text = '지금' + this.today_todos[i].title + ' 할 시간.'
              new Notification('할 일', { body: text, icon: img }) // 알람
            
              this.today_todos[i].completed = "yes" // 알람띄운 todo는 completed 변경
              // db의 todo completed여부도 변경
              todoCompleted ({...this.today_todos[i], completed: "yes"},
              () => {
                console.log('completed 수정 성공')
              },
              (err) => {
                console.log(err)
              });
            }
          }
        }
      },1000)
    },

    // 권한 획득 (알람 허용 여부 물어보기)
    // prtmiddion은 denied, granted, default 세 종류 있고 처음엔 default
    // default 값이면 requestPermission()을 사용하여 권한 요청
    askNotificationPermission : function() {
      if (Notification.permission === "default" ) {
        Notification.requestPermission()
        .then(console.log('알림허용성공')) // 원래 여기서 permission이 denied인지 granted인지 비교해야하지만, 사용자가 무조건 허용한다는 전제로 넘어감. 
      }
      else{
        console.log('이미 알림허용돼있다')
      }
    },
    getTodo : function() {
      const day = new Date();
      let cur_year = day.getFullYear();
      let cur_month = day.getMonth()+ 1;
      let cur_day = day.getDate();
      let login_hour = day.getHours();
      let login_minute = day.getMinutes();

      todoList (
      (res) => {
        var i;
        for (i=0; i < res.data.length; i++){ // 내가 쓴 todo만 가져오기
          if (res.data[i].user == this.userInfo.id) {
            this.todos.push(res.data[i])
            // console.log('todo', this.todo)
          }
        }
        var j;
        for (j=0; j < this.todos.length; j++){ // 오늘 날짜에 해당하는 todo만 today_todos에 넣기
          if ((this.todos[j].alarm_year === cur_year) && (this.todos[j].alarm_month === cur_month) && (this.todos[j].alarm_date === cur_day)) {
            if ((this.todos[j].completed === "no") && (this.todos[j].alarm_hour === login_hour) && (this.todos[j].alarm_min < login_minute)) {
              this.today_last_todos.push(this.todos[j]);
            } else if ((this.todos[j].completed === "no") && (this.todos[j].alarm_hour < login_hour)) {
              this.today_last_todos.push(this.todos[j]);
            } else {
              this.today_todos.push(this.todos[j]);
            }
          }
        }
        this.checkAlarm()
      },
      (err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.askNotificationPermission();
    if (this.isLogin) { // 로그인 해야 todo가져오기
      this.getTodo();
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userStore.userInfo,
      isLogin: (state) => state.userStore.isLogin,
    }),
  }
}
</script>

<style></style>
