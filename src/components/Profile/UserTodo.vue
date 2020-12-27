<template>
  <div>
    <div @click="toggleTodoinfo">
      {{ todo.title }}
    </div>
    <div :class="{profileTodoInfoBox: hide}">
      <table>
        <tr>
          <th scope="col"> 일정</th>
          <td>
            {{ todo.schedule_year}} 년 {{ todo.schedule_month }} 월 {{ todo.schedule_date }} 일 {{ todo.schedule_hour }} 시 {{ todo.schedule_min }} 분 
          </td>
        </tr>
        <tr>
          <th scope="col"> 알림</th>
          <td>
            {{ todo.alarm_year}} 년 {{ todo.alarm_month }} 월 {{ todo.alarm_date }} 일 {{ todo.alarm_hour }} 시 {{ todo.alarm_min }} 분 
          </td>
        </tr>
      </table>
      
      
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hide: true,
    }
  },
  props: {
    todo : Object,
  },
  methods: {
    toggleTodoinfo() {
      this.hide = !this.hide
    },
  },
}
</script>

<style>
.profileTodoInfoBox {
  display: none;
}
</style>