<template>
  <div>
    <div>
      <!-- <span :class="{ completed: !todo.completed }" @click="updateTodoStatus">{{
        todo.title
      }}</span> -->
      <span @click="TodoModalViewed">{{ todo.title }}</span>
      {{ isTodoModalViewed2 }}
      <Detail :todo="todo" v-if="isTodoModalViewed2"> </Detail>
      <!-- <button @click="deleteTodo"> Delete!</button> -->
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
// import {getTodo} from "../../api/todo.js"
import Detail from "./Detail";
export default {
  name: "Todo",
  components: {
    Detail,
  },
  props: {
    todo: Object,
  },
  data: function () {
    return {
      // isTodoModalViewed: false,
    };
  },
  computed: {
    isTodoModalViewed2() {
      return this.$store.state.isTodoModalViewed;
    },
  },
  methods: {
    TodoModalViewed: function () {
      this.$store.dispatch("isTodoModaViewed");
    },
    deleteTodo: function () {
      this.$store.dispatch("deleteTodo", this.todo);
    },
    updateTodoStatus: function () {
      this.$store.dispatch("updateTodoStatus", this.todo);
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
.modal {
  position: relative;
  max-width: 400px;
  height: 10px;
  margin: 30px;
  margin-top: 30px;
  padding: 20px;
  background-color: black;
  z-index: 10;
  opacity: 1;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: rgb(240, 240, 175);
  min-height: 500px;
  z-index: 10;
  opacity: 1;
}
</style>