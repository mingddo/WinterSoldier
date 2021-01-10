export const changeAddTodo = (state, newTodo) => {
  state.newTodo = newTodo
}
export const changeAddTodoStatus = (state) => {
  state.addTodo = !state.addTodo
}
export const changeDelTodo = (state, backTodo) => {
  console.log("muta의 changeDelTodo", backTodo)
  state.backTodo = backTodo
}
export const changeDelTodoStatus = (state) => {
  console.log("muta의 changeDelTodoStatus", state.delTodo)
  state.delTodo = !state.delTodo
}