export const getAlarmTodos = (state, today_alarm_todos) => {
  state.today_alarm_todos = today_alarm_todos
};
export const getNotAlarmTodos = (state, today_notAlarm_todos) => {
  state.today_notAlarm_todos = today_notAlarm_todos
};
export const addTodoList = (state, newTodo) => {
  state.today_notAlarm_todos.push(newTodo)
};
// export const getTodayAlarmTodos = (state, today_alarm_todos) => {
//   state.today_alarm_todos = today_alarm_todos
// };
export const isCompleted = (state, idx) => {
  state.today_notAlarm_todos[idx].completed = "yes"
};

export const changeCalendar = (state) => {
  state.calendartogglestate = !state.calendartogglestate
};