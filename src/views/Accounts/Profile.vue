<template>
  <div class="profilebox">

    <!-- user -->
    <div class="profile-content-box">
      <div>
        <h1> {{ userinfo.username }} 님의 프로필 </h1>
        <!-- 본인이 아닌 경우 팔로우 버튼 활성화 -->
        <div v-if="userinfo.username !== myinfo.username">

          <button v-if="!isFollowing" @click="follow"> 팔로우 </button>
          <button v-else @click="unfollow"> 팔로우 취소 </button>
          <button> 그룹에 초대하기 </button>
        </div>
      </div>

      <!-- 팔로우 & 팔로잉 -->
      <div>
        <div>
          <h2>{{ userinfo.username }} 님을 팔로우 </h2>
          <div>
            {{ follower_length }}
          </div>
          <div>
            <UserFollower 
            v-for="follower in userinfo.followers"
            :key="follower.id"
            :follower="follower"
            :followings="followings"
            @getuserprofile="getuserprofile"/>
          </div>
        </div>
        <div>
          <h2>{{ userinfo.username }} 님이 팔로잉 </h2>
          <div>
            {{ following_length }}
          </div>
          <div>
            <UserFollowing 
            v-for="following in userinfo.followings"
            :key="following.id"
            :following="following"
            :followers="followers"
            @getuserprofile="getuserprofile"
            />
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

          <div v-if="myinfo.username == userinfo.username ||isFollowing && isFollowed">
            <UserTodo
              v-for="(todo, idx) in userTodo"
              class="profile.todobox-tab-content"
              :class="{current:all}"
              :todo="todo" :key="idx"/>
          </div>
          <div v-else>
            맞팔로우한 유저만 todo 볼 수 있습니다~!!
          </div>
        </div>
        
        


      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { userprofile } from "@/api/accounts.js";
import { addfollow } from "@/api/accounts.js";
import { removefollow } from "@/api/accounts.js";
import '@/assets/accounts.css';
import UserTodo from '@/components/Profile/UserTodo.vue'
import UserFollower from '../../components/Profile/UserFollower.vue';
import UserFollowing from '../../components/Profile/UserFollowing.vue';

export default {
  name: 'Profile',
  components: {
    UserTodo,
    UserFollower,
    UserFollowing,
  },
  data () {
    return {
      all: true,
      doing: false,
      completed: false,
      userinfo: {},
      userTodo: [],
      followings: [],
      followers: [],
      isFollowing: false,
      isFollowed: false,
    }
  },
  methods : {
    getuserprofile() {
      userprofile(
        this.$route.query.name,
        (res) => {
        const saveuserInfo = JSON.stringify(res.data);
        sessionStorage.setItem('user', saveuserInfo)
        const getuserInfo = sessionStorage.getItem('user')
        this.userinfo = JSON.parse(getuserInfo)
        this.userTodo = this.userinfo.my_todo
        this.followers = this.userinfo.followers
        this.followings = this.userinfo.followings
        const token = localStorage.getItem('jwt')
        this.$store.dispatch("userStore/GET_MEMBER_INFO", token)

        for (let follow of this.myinfo.followings) {
          if (this.userinfo.username == follow.username) {
            this.isFollowing = true
          }
        }
        for (let follow of this.myinfo.followers) {
          if (this.userinfo.username == follow.username) {
            this.isFollowed = true
          }
        }
        },
        (err) => {
          console.log(err)
        }
      );
    },
    follow () {
      addfollow(
        this.userinfo.username,
        (res) => {
          console.log('성공시', res)
          this.getuserprofile();
          this.isFollowing = true
        },
        (err) => {
          console.log(err)
        }
      )
    },
    unfollow () {
      removefollow(
        this.userinfo.username,
        (res) => {
          console.log('성공시', res)
          this.getuserprofile();
          this.isFollowing = false
        },
        (err) => {
          console.log('실패시', err)
        }
      )
    },
    AllTodo () {
      this.all = true
      this.doing = false
      this.completed = false
      this.userTodo = this.userinfo.my_todo
    },
    DoingTodo() {
      this.all = false
      this.doing = true
      this.completed = false
      this.userTodo = this.userinfo.my_todo.filter( x => {
          return x.completed == 'no'
        })
    },
    completedTodo () {
      this.all = false
      this.doing = false
      this.completed = true
      this.userTodo = this.userinfo.my_todo.filter( x => {
          return x.completed !== 'no'
        })
    },
  },
  created () {
    this.getuserprofile();
  },
  computed: {
    ...mapState({
      myinfo: (state) => state.userStore.userInfo,
      isLogin: (state) => state.userStore.isLogin,
    }),
    following_length () {
      if (this.userinfo.followings !== null && this.userinfo.followings !== undefined) {
        return this.userinfo.followings.length
      } else {
        return 0
      }
    },
    follower_length () {
      if (this.userinfo.followers !== null && this.userinfo.followers !== undefined) {
        return this.userinfo.followers.length
      } else {
        return 0
      }
    },
  }
}
</script>

<style>
.profilebox {
  flex: 8 8 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: var(--padding) calc(var(--padding) * 2);
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