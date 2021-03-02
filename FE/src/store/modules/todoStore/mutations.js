export const addNewTodo = (state, newTodo) => {
  state.newTodo = newTodo
  state.changeTodo = !state.changeTodo
};
export const addAlarm = (state, newAlarm) => {
  state.newAlarm = newAlarm
  state.changeAlarm = !state.changeAlarm
};
export const isCompleted = (state, idx) => {
  state.today_notAlarm_todos[idx - 1].completed = "yes"
};
export const changeCalendar = (state) => {
  state.calendartogglestate = !state.calendartogglestate
};