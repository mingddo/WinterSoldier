<template>
  <div>
    <div @click="TodoModalViewed">
      <span>{{ todo.title }}</span>
    </div>
    <div>
      <Detail :todo="todo" v-if="isTodoModalViewed2"> </Detail>
    </div>
  </div>
</template>

<script>
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
    return {};
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