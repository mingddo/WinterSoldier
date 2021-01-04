import { todoList } from "@/api/todo.js";

// 1. 오늘 날짜와 현재 시간을 가져와서
const day = new Date();
let cur_year = day.getFullYear();
let cur_month = addZeros(day.getMonth() + 1, 2);
let cur_day = addZeros(day.getDate(), 2);
let cur_hour = addZeros(day.getHours(), 2);
let cur_minute = addZeros(day.getMinutes(), 2);
let today =
  cur_year.toString() + cur_month.toString() + cur_day.toString();
let today_todos = [];
let today_alarm_todos = [];
let today_notAlarm_todos = [];

export const getTodayTodos = ({ commit }) => {
  // 2. 오늘 날짜의 todo를 돌면서, 알람 시간 지난 todo와 아직 알람 시간 아닌 todo 구분
  todoList(
    (res) => {
      today_todos = res.data.todolist[today];
      var i;
      for (i = 0; i < today_todos.length; i++) {
        if (
          today_todos[i].completed === "no" &&
          today_todos[i].alarm_hour === cur_hour &&
          today_todos[i].alarm_min < cur_minute
        ) {
          today_notAlarm_todos.push(today_todos[i]);
        } else if (
          today_todos[i].completed === "no" &&
          today_todos[i].alarm_hour < cur_hour
        ) {
          today_notAlarm_todos.push(today_todos[i]);
        } else {
          today_alarm_todos.push(today_todos[i]);
        }
      }
      commit('getAlarmTodos', today_alarm_todos)
      commit('getNotAlarmTodos', today_notAlarm_todos)
    },
    (err) => {
      console.log(err);
    }
  );
};

// export const getTodayAlarmTodos = ({ commit }) => {
//   todoList(
//     (res) => {
//       today_alarm_todos = res.data.todolist[today];
//       var i;
//       for (i = 0; i < today_todos.length; i++) {
//         if (
//           today_todos[i].completed === "no"
//         ) {
//           today_alarm_todos.push(today_todos)
//         }
//       }
//       commit('getTodayAlarmTodos', today_alarm_todos)
//     },
//     (err) => {
//       console.log(err);
//     }
//   )
// }

export const addTodoList = ({ commit }, newTodo) => {
  let time_info = newTodo.alarm_year + newTodo.alarm_month + newTodo.alarm_date
  if (today === time_info) {
    commit('addTodoList', newTodo)
    alert('addTodoList는 했다')
  }
}

function addZeros(num, digit) {
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
}