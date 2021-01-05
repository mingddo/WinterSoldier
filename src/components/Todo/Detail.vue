<template>
  <div>
    <div class="detail__modal" @click.self="TodoModalViewed">
      <div class="modal__card">
        <h3>할 일 제목 : {{ todo.title }}</h3>
        <table class="todo-table">
          <tr class="todo-tr">
            <td class="todo-td">계획</td>
            <td class="todo-td">계획 년도</td>
            <td class="todo-td">계획 월</td>
            <td class="todo-td">계획 일</td>
            <td class="todo-td">계획 시간</td>
            <td class="todo-td">계획 분</td>
          </tr>
          <tr class="todo-tr">
            <td class="todo-td">계획</td>
            <td class="todo-td">{{ todo.schedule_year }}년</td>
            <td class="todo-td">{{ todo.schedule_month }}월</td>
            <td class="todo-td">{{ todo.schedule_date }}일</td>
            <td class="todo-td">{{ todo.schedule_hour }}시</td>
            <td class="todo-td">{{ todo.schedule_min }}분</td>
          </tr>
          <tr class="todo-tr">
            <td class="todo-td">알람</td>
            <td class="todo-td">알람 년도</td>
            <td class="todo-td">알람 월</td>
            <td class="todo-td">알람 일</td>
            <td class="todo-td">알람 시간</td>
            <td class="todo-td">알람 분</td>
          </tr>
          <tr class="todo-tr">
            <td class="todo-td">알람</td>
            <td class="todo-td">{{ todo.alarm_year }}년</td>
            <td class="todo-td">{{ todo.alarm_month }}월</td>
            <td class="todo-td">{{ todo.alarm_date }}일</td>
            <td class="todo-td">{{ todo.alarm_hour }}시</td>
            <td class="todo-td">{{ todo.alarm_min }}분</td>
          </tr>
        </table>
        <button @click="deleteTodo">Delete</button>
        <Modify
          :todo="todo"
          v-if="isModifyModalViewed"
          @modify-close-modal="isModifyModalViewed = false"
        >
        </Modify>
        <button @click="isModifyModalViewed = true">수정하기</button>
        <br />
        <img
          @click="TodoModalViewed"
          src="../../assets/close.png"
          alt=""
          width="50px"
          height="30px"
          class="overlay-button"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { deleteTodo } from "@/api/todo.js";
import Modify from "./Modify";
export default {
  name: "Detail",
  components: {
    Modify,
  },
  props: {
    todo: Object,
  },
  data() {
    const todono = Number(this.todo.id);
    console.log(todono + "번 글입니다.");
    return {
      isModifyModalViewed: false,
      todono: this.todo.id,
    };
  },

  methods: {
    ModifyModalViewed() {
      this.isModifyModalViewed = true;
    },
    deleteTodo() {
      if (confirm("정말로 삭제???")) {
        console.log(this.todono);
        deleteTodo(
          this.todono,
          (response) => {
            console.log(response);
            this.$store.dispatch("isTodoModaViewed");
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    TodoModalViewed() {
      this.$store.dispatch("isTodoModaViewed");
    },
  },
};
</script>

<style scoped src="@\assets\tododetail.css">
</style>