<template>
  <div>
    <div class="detail-modal">
      <div class="modal-card container">
        <h3>{{ todo.title }}</h3>
        <hr />
        <br />
        <table class="todo-table">
          <tr class="todo-tr">
            <td class="todo-td">계획</td>
            <td class="todo-td">년도</td>
            <td class="todo-td">월</td>
            <td class="todo-td">일</td>
            <td class="todo-td">시간</td>
            <td class="todo-td">분</td>
          </tr>
          <tr class="todo-tr">
            <td class="todo-td">계획:</td>
            <td class="todo-td">{{ todo.schedule_year }}년</td>
            <td class="todo-td">{{ todo.schedule_month }}월</td>
            <td class="todo-td">{{ todo.schedule_date }}일</td>
            <td class="todo-td">{{ todo.schedule_hour }}시</td>
            <td class="todo-td">{{ todo.schedule_min }}분</td>
          </tr>
          <tr class="todo-tr">
            <td class="todo-td">알람</td>
            <td class="todo-td">년도</td>
            <td class="todo-td">월</td>
            <td class="todo-td">일</td>
            <td class="todo-td">시간</td>
            <td class="todo-td">분</td>
          </tr>
          <tr class="todo-tr">
            <td class="todo-td">알람:</td>
            <td class="todo-td">{{ todo.alarm_year }}년</td>
            <td class="todo-td">{{ todo.alarm_month }}월</td>
            <td class="todo-td">{{ todo.alarm_date }}일</td>
            <td class="todo-td">{{ todo.alarm_hour }}시</td>
            <td class="todo-td">{{ todo.alarm_min }}분</td>
          </tr>
        </table>
        <div class="far fa-trash-alt overlay-button" @click="deleteTodo"></div>
        <Modify
          :todo="todo"
          v-if="isModifyModalViewed"
          @modify-close-modal="isModifyModalViewed = false"
        >
        </Modify>
        <div
          class="fas fa-wrench overlay-button"
          @click="isModifyModalViewed = true"
        ></div>
        <br />
        <img
          @click="TodoModalViewed"
          src="../../assets/close.png"
          alt=""
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
      // todo: {
      //     title : '',
      //     schedule_year : 0,
      //     schedule_month : 0,
      //     schedule_date : 0,
      //     schedule_hour : 0,
      //     schedule_min : 0,
      //     alarm_year : 0,
      //     alarm_month : 0,
      //     alarm_date : 0,
      //     alarm_hour : 0,
      //     alarm_min : 0

      // }
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

<style>
.modal-card {
  position: relative;
  max-width: 100%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: rgb(240, 240, 175);
  min-height: 500px;
  z-index: 10;
  opacity: 1;
}
.todo-table {
  border-collapse: collapse;
  border: 2px solid rgb(200, 200, 200);
  letter-spacing: 1px;
  font-size: 1.3rem;
  color: white;
  background-color: black;
}
.todo-td,
.todo-th {
  border: 1px solid black(190, 190, 190);
  height: 50px;
  padding: 1px;
}

.todo-th {
  background-color: rgb(235, 235, 235);
  color: black;
}

.todo-td {
  text-align: center;
  color: white;
}

.todo-tr:nth-child(even) .todo-td {
  background-color: black;
}

.todo-tr:nth-child(odd) .todo-td {
  background-color: grey;
}
.overlay-button {
  direction: column;
  justify-content: flex-end;
  width: 50px;
  height: 30px;
  border: grey;
}
.container {
  position: fixed;
  box-shadow: 0px 0px 10px 0.3px var(--light-gray);
  border: none;
  top: 20%;
  left: 40%;
}
</style>