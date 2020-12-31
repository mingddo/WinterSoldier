<template>
  <div>
    <div>
      <span :class="{completed:todo.completed}" @click='updateTodoStatus'>{{todo.title}}</span>
      <Detail :todo='todo' v-if="isTodoModalViewed" @close-modal='isTodoModalViewed=false' > </Detail> <button @click="isTodoModalViewed=true"> 상세보기</button>
      <!-- <button @click="deleteTodo"> Delete!</button> -->
    </div>
  </div>
</template>

<script>
// import {getTodo} from "../../api/todo.js"
import Detail from './Detail'
export default {
    name : 'Todo',
    components : {
      Detail
    },
    props:{
        todo : Object,
    },
    data: function() {
      return {
        isTodoModalViewed: false
      }
    },
    methods: {
        deleteTodo : function() {
            this.$store.dispatch('deleteTodo',this.todo)
        },
        updateTodoStatus : function() {
          this.$store.dispatch('updateTodoStatus',this.todo)
        }
    }
}

</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
.modal, .overlay { width: 75%; height: 75%; position: fixed; left: 0; top: 0; color: white; } 
.overlay { opacity: 0.5; background-color: black; } 
.modal-card { position: relative; max-width: 80%; margin: auto; margin-top: 30px; padding: 20px; background-color: rgb(240, 240, 175); min-height: 500px; z-index: 10; opacity: 1; }

</style>