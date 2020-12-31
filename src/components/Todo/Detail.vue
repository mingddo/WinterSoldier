<template>
<div>
    <div class="modal">
        <div class="overlay" @click="$emit('close-modal')">
         </div>
         <div class="modal-card">   
            <h3>할 일 제목 : {{todo.title}} </h3> 
            <table class="todo-table">
                <tr class="todo-tr">
                    <td class="todo-td">계획</td>
                    <td class="todo-td">계획 년도</td>
                    <td class="todo-td">계획 월 </td>
                    <td class="todo-td">계획 일 </td>
                    <td class="todo-td">계획 시간 </td>
                    <td class="todo-td">계획 분 </td>
                </tr>
                <tr class="todo-tr">
                    <td class="todo-td">계획</td>
                    <td class="todo-td">{{todo.schedule_year}}년</td>
                    <td class="todo-td">{{todo.schedule_month}}월</td>
                    <td class="todo-td">{{todo.schedule_date}}일</td>
                    <td class="todo-td">{{todo.schedule_hour}}시</td>
                    <td class="todo-td">{{todo.schedule_min}}분</td>
                    
                </tr>
                 <tr class="todo-tr">
                    <td class="todo-td">알람</td>
                    <td class="todo-td">알람 년도</td>
                    <td class="todo-td">알람 월 </td>
                    <td class="todo-td">알람 일 </td>
                    <td class="todo-td">알람 시간 </td>
                    <td class="todo-td">알람 분 </td>
                </tr>
                <tr class="todo-tr">
                    <td class="todo-td">알람</td>
                    <td class="todo-td">{{todo.alarm_year}}년</td>
                    <td class="todo-td">{{todo.alarm_month}}월</td>
                    <td class="todo-td">{{todo.alarm_date}}일</td>
                    <td class="todo-td">{{todo.alarm_hour}}시</td>
                    <td class="todo-td">{{todo.alarm_min}}분</td>
                    
                </tr>
            </table>
            <button @click="deleteTodo">Delete</button>
            <Modify :todo="todo" v-if="isModifyModalViewed" @close-modal="isModifyModalViewed = false"> </Modify> <button @click="isModifyModalViewed = true">수정하기</button>
        </div>
    </div>
</div>
</template>

<script>
import {deleteTodo } from "@/api/todo.js";
import Modify from './Modify';
export default {
    name : 'Detail',
    components : {
      Modify,
        
    },
    props : {
        todo : Object
    },
    data() {
        const todono = Number(this.todo.id)
        console.log(todono + '번 글입니다.')
        return {
            isModifyModalViewed : false,
            todono : this.todo.id
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
      }
    },
    
    methods: {
        deleteTodo() {
      if(confirm("정말로 삭제???")) {
          console.log(this.todono);
        deleteTodo(
          this.todono,
          (response) => {
            console.log(response);
            this.$emit('close-modal')
          },
          (error) => {
            console.log(error);
          }
        )
      }
    }
    }
}
</script>

<style>
.modal, .overlay { width: 75%; height: 75%; position: fixed; left: 0; top: 0; color: white; } 
.overlay { opacity: 0.5; background-color: black; } 
.modal-card { position: relative; max-width: 80%; margin: auto; margin-top: 30px; padding: 20px; background-color: rgb(240, 240, 175); min-height: 500px; z-index: 10; opacity: 1; }
.todo-table {
   border-collapse: collapse;
    border: 2px solid rgb(200,200,200);
    letter-spacing: 1px;
    font-size: 0.8rem;
    color: black;

   }
.todo-td,.todo-th {
    border: 1px solid rgb(190,190,190);
    padding: 10px 20px;
  }
  
.todo-th {
    background-color: rgb(235,235,235);
  }
  
.todo-td {
    text-align: center;
  }
  
  .todo-tr:nth-child(even) .todo-td {
    background-color: rgb(250,250,250);
  }
  
  .todo-tr:nth-child(odd) .todo-td {
    background-color: rgb(245,245,245);
  }
  
</style>