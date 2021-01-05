export const getAlarmTodos = (state, today_alarm_todos) => {
  state.today_alarm_todos = today_alarm_todos
};
export const getNotAlarmTodos = (state, today_notAlarm_todos) => {
  state.today_notAlarm_todos = today_notAlarm_todos
};
export const addTodoList = (state, newTodo) => {
  state.today_notAlarm_todos.push(newTodo)
};
export const isCompleted = (state, idx) => {
  state.today_notAlarm_todos[idx - 1].completed = "yes"
};
export const addNewTodo = (state, newTodo) => {
  state.newTodo = newTodo
  state.changeTodo = !state.changeTodo
};

export const changeCalendar = (state) => {
  state.calendartogglestate = !state.calendartogglestate
};