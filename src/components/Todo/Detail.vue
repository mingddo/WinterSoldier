<template>
  <div class="detail__modal" @dblclick="Temp_Test_Function">
    <div class="modal__card">
      <div class="detail-todo-header">
        <div class="schedule-day" @click="Temp_Test_Function">
          {{ todo.schedule_month }}월 {{ todo.schedule_date }}일
        </div>
        <div class="schedule-day-button">
          <span @click="deleteTodo"><i class="fas fa-trash-alt"></i></span>
          <span @click="isModifyModalViewed = true"
            ><i class="fas fa-edit"></i
          ></span>
        </div>
      </div>
      <hr />
      <div class="detail-todo-content">{{ todo.title }}</div>
      <div class="detail-todo-footer">
        <span><i class="fas fa-bell"></i></span>
        <span>
          {{ todo.alarm_year }}년 {{ todo.alarm_month }}월
          {{ todo.alarm_date }}일 {{ todo.alarm_hour }}시 {{ todo.alarm_min }}분
        </span>
      </div>
      <Modify
        :todo="todo"
        v-if="isModifyModalViewed"
        @modify-close-modal="isModifyModalViewed = false"
        @modify_data_emit="modify_data_emit"
      >
      </Modify>
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
    Temp_Test_Function() {
      this.$emit("temp_close");
    },
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