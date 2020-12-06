<template>
  <div>
    <div>
      <span>{{todo.title}}</span>
      <button @click="deleteTodo"> Delete!</button>
    </div>
  </div>
</template>

<script>
export default {
    name : 'Todo',
    props:{
        todo : Object,
    },
    methods: {
        deleteTodo : function() {
            this.$store.dispatch('deleteTodo',this.todo)
        }
    }
}
</script>

<style>

</style>