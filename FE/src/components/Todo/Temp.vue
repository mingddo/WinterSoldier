<template>
  <div>
    <div @click="temp_test = true">- {{ todo.title }}</div>
    <div @click="temp_test = true">
      <!-- {{ todo.alarm_hour }}시 {{ todo.alarm_min }}분 -->
    </div>
    <Detail
      :todo="todo"
      v-if="temp_test"
      @temp_close="temp_test = false"
    ></Detail>
  </div>
</template>

<script>
import Detail from "./Detail";
export default {
  name: "Temp",
  components: {
    Detail,
  },
  props: {
    todo: Object,
  },
  data: function () {
    return {
      temp_test: false,
    };
  },
  computed: {
    isTodoModalViewed2() {
      return this.$store.state.isTodoModalViewed;
    },
  },
  methods: {
    TodoModalViewed() {
      this.$store.dispatch("isTodoModaViewed");
    },
  },
};
</script>

<style>
</style>