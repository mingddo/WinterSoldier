export const changeAddTodo = (state, newTodo) => {
  state.newTodo = newTodo
}
export const changeAddTodoStatus = (state) => {
  state.addTodo = !state.addTodo
}
export const changeDelTodo = (state, backTodo) => {
  state.backTodo = backTodo
}
export const changeDelTodoStatus = (state) => {
  state.delTodo = !state.delTodo
}