<template>
  <div class="profile-todobox-tab-content-each">
    <div class="pointer" @click="toggleTodoinfo">
      <h3>{{ todo.title }}</h3>
    </div>
    <div :class="{profileTodoInfoBox: hide}">
      <table class="todobox-detail">
        <tr>
          <th scope="col"> <img src="https://img.icons8.com/carbon-copy/24/000000/calendar--v2.png"/> </th>
          <td>
            {{ todo.schedule_year}} 년 {{ todo.schedule_month }} 월 {{ todo.schedule_date }} 일 {{ todo.schedule_hour }} 시 {{ todo.schedule_min }} 분 
          </td>
        </tr>
        <br>
        <tr>
          <th scope="col"> <img src="https://img.icons8.com/ios/24/000000/alarm.png"/></th>
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
.todobox-detail {
  margin: 10px;
}
.todobox-detail > tr {
  margin: 5px;
  padding: 5px;
  border-bottom: 1px solid;
}
</style>