<template>
  <div class="profilebox">

    <!-- 팔로우 목록 -->
    <div class="profile-content-box">
      <div>
        <h1> {{ userinfo.username }} 님의 프로필 </h1>
        <button> 팔로우 </button>
        <button> 그룹에 초대하기 </button>
        <!-- 현재 로그인 여부 -->
        <div v-if="userinfo.is_active">
          로그인중!! 이거 아이콘 같은걸로?
        </div>
        <div v-else>
          로그아웃 중!!
        </div>
      </div>
      <div>
        <div>
          <h2>{{ userinfo.username }} 님을 팔로우 </h2>
          <div>
            여기에 팔로워 명수? -> 클릭시 명단 토글이나 모달
            <!-- {{ userinfo.followers }} -->
          </div>
        </div>
        <div>
          <h2>{{ userinfo.username }} 님이 팔로잉 </h2>
          <div>
            여기에 팔로잉 명수 -> 클릭시 명단 토글이나 모달
            <!-- {{ userinfo.followings }} -->
          </div>
        </div>
        <div>
          <h2>{{ userinfo.username }} 님이 속한 그룹 </h2>
          <div>
            여기에 속한 그룹수 -> 클릭시 명단 토글이나 모달
            <!-- {{ userinfo.followings }} -->
          </div>
        </div>
        
        
      </div>
      
    </div>


    <!-- todo 목록 -->
    <div class="profile-content-box">
      <div>
        <h2> {{userinfo.username}} 님의 일정 (제목 토글하면 내용 보임) </h2>
        <div>
          <ul class="profile-todobox-tab">
            <li @click="AllTodo" :class="{current:all}">전체</li>
            <li @click="DoingTodo" :class="{current:doing}">진행 중</li>
            <li @click="completedTodo" :class="{current:completed}">완료</li>
          </ul>

          <div v-if="all">
            <UserTodo
              v-for="(todo, idx) in userAllTodo"
              class="profile.todobox-tab-content"
              :class="{current:all}"
              :todo="todo" :key="idx"/>
          </div>

          <div v-if="doing">
            <UserTodo
              v-for="(todo, idx) in userDoingTodo" 
              class="profile.todobox-tab-content"
              :class="{current:doing}"
              :todo="todo" :key="idx"/>
          </div>

          <div v-if="completed">
            <UserTodo
              v-for="(todo, idx) in userCompletedTodo" 
              class="profile.todobox-tab-content"
              :class="{current:completed}"
              :todo="todo" :key="idx"/>
          </div>
        </div>
        


      </div>
    </div>
  </div>
</template>

<script>
import { userprofile } from "@/api/accounts.js";
import UserTodo from '@/components/Profile/UserTodo.vue'
export default {
  name: 'Profile',
  components: {
    UserTodo,
  },
  data () {
    return {
      all: true,
      doing: false,
      completed: false,
      userinfo: {},
      userAllTodo: [],
      userCompletedTodo: [],
      userDoingTodo: [],
      hidetodoInfo: true,
    }
  },
  methods : {
    AllTodo () {
      this.all = true
      this.doing = false
      this.completed = false
    },
    DoingTodo() {
      this.all = false
      this.doing = true
      this.completed = false
    },
    completedTodo () {
      this.all = false
      this.doing = false
      this.completed = true
    },
  },
  created () {
    userprofile(
      this.$route.query.name,
      (res) => {
        const saveuserInfo = JSON.stringify(res.data);
        sessionStorage.setItem('user', saveuserInfo)
        const getuserInfo = sessionStorage.getItem('user')
        this.userinfo = JSON.parse(getuserInfo)
        this.userAllTodo = this.userinfo.my_todo

        for (let todo of this.userinfo.my_todo) {
          if (todo.completed == 'no') {
            this.userDoingTodo.push(todo)
          } else {
            this.userDoingTodo.push(todo)
          }
        }
      },
      (err) => {
        console.log(err)
      }
    );
  },
}
</script>

<style>
.profilebox {
  width: 80%;
}
.profile-content-box {
  display: flex;
  justify-content: space-between;
}
.profile-content-box div {
  border: 1px solid;
  width: 100%;
}
.profileTodoBox {
  width: 100%;
}
ul.profile-todobox-tab {
  list-style: none;
}
ul.profile-todobox-tab li {
  background: none;
	color: #222;
	display: inline-block;
	padding: 10px 15px;
	cursor: pointer;
}
ul.profile-todobox-tab li.current{
	background: #ededed;
	color: #222;
}
.profile.todobox-tab-content {
  background: #ededed;
}
.profile.todobox-tab-content.current {
  background: #ededed;
}
</style>