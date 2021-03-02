<template>
  <div class="profilebox">
    <!-- user -->
    <div class="profile-content-box">
      <div class="profile-img-box">
        <div>
          <span>
            <img
              src="https://img.icons8.com/ios-filled/100/000000/user-male-circle.png"
            />
          </span>
          <span>
            <h1>{{ userinfo.username }}</h1>
          </span>
        </div>
        <!-- 본인이 아닌 경우 팔로우 버튼 활성화 -->
        <div
          class="profile-img-invite-btn"
          v-if="userinfo.username !== myinfo.username"
        >
          <div v-if="!isFollowing">
            <span
              ><img
                class="pointer"
                title="팔로우"
                @click="follow(userinfo.username)"
                src="https://img.icons8.com/ios/50/000000/add-user-male.png"
            /></span>
            <span><h4>FOLLOW</h4></span>
          </div>
          <div v-else>
            <span
              ><img
                class="pointer"
                title="팔로우 취소"
                @click="unfollow"
                src="https://img.icons8.com/ios-filled/50/000000/remove-user-male.png"
            /></span>
            <span><h4>UNFOLLOW</h4></span>
          </div>
          <div>
            <span
              ><img
                class="pointer"
                src="https://img.icons8.com/ios/50/000000/add-user-group-man-man--v1.png"
            /></span>
            <span><h4>INVITE GROUP</h4></span>
          </div>
        </div>
        <div class="profile-img-invite-btn" v-else>
          <div>
            <span><img class="pointer" title="새 그룹 만들기" @click="addgroupDetail" src="https://img.icons8.com/ios/50/000000/add-user-group-man-man--v1.png"/></span>
            <span><h4> CREATE GROUP </h4></span>
          </div>
        </div>
      </div>

      <!-- 팔로우 & 팔로잉 -->
      <div class="profile-content-social-box">
        <div class="profile-content-follow-box">
          <div class="profile-content-eachbox">
            <div>
              <h2>FOLLOWER</h2>
            </div>
            <div
              v-if="userinfo.username == myinfo.username"
              @click="followerDetail"
            >
              <h2 class="pointer">{{ follower_length }}</h2>
            </div>
            <div v-else>
              <h2>{{ follower_length }}</h2>
            </div>
            <div></div>
            <div
              :class="{ disappear: !watchfollower }"
              class="profile-follow-modal"
            >
              <div>
                <div class="profile-follow-modal-title">
                  <div>
                    <h2>Follower</h2>
                  </div>
                  <div class="profile-follow-modal-close">
                    <img
                      class="pointer"
                      @click="followerDetail"
                      src="https://img.icons8.com/ios/50/000000/close-window.png"
                    />
                  </div>
                </div>
              </div>
              <div class="profile-follow-modal-content">
                <UserFollower
                  v-for="follower in userinfo.followers"
                  :key="follower.id"
                  :follower="follower"
                  :followings="followings"
                  @getuserprofile="getuserprofile"
                />
              </div>
            </div>
          </div>
          <div class="profile-content-eachbox">
            <div>
              <h2>FOLLOWING</h2>
            </div>
            <div
              v-if="userinfo.username == myinfo.username"
              @click="followingDetail"
            >
              <h2 class="pointer">{{ following_length }}</h2>
            </div>
            <div v-else>
              <h2>{{ following_length }}</h2>
            </div>
            <div
              :class="{ disappear: !watchfollowing }"
              class="profile-follow-modal"
            >
              <div>
                <div class="profile-follow-modal-title">
                  <div>
                    <h2>Following</h2>
                  </div>
                  <div class="profile-follow-modal-close">
                    <img
                      class="pointer"
                      @click="followingDetail"
                      src="https://img.icons8.com/ios/50/000000/close-window.png"
                    />
                  </div>
                </div>
                <div class="profile-follow-input-box">
                  <input
                    placeholder="유저 이름을 입력하세요"
                    @dblclick="closecompleted"
                    type="text"
                    v-model.trim="findFriend"
                    @keyup="autocompleted"
                    title="더블클릭시 자동완성 꺼집니다"
                  />
                  <div
                    class="profile-follow-input-follow "
                    @click="follow(findFriend)"
                    title="팔로우"
                  >
                    <button>Follow</button>
                  </div>
                  <div
                    class="profile-follow-input-autocompleted"
                    :class="{ disappear: disappear }"
                  >
                    <div v-for="a in auto" :key="a.id">
                      <span class="pointer" @click="inputkeyword(a)">
                        {{ a }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="profile-follow-modal-content">
                  <UserFollowing
                    v-for="following in userinfo.followings"
                    :key="following.id"
                    :following="following"
                    :followers="followers"
                    @getuserprofile="getuserprofile"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="profile-content-eachbox">
            <div>
              <h2>GROUP</h2>
            </div>

            <div
              v-if="userinfo.username == myinfo.username"
              @click="groupDetail"
            >
              <h2 class="pointer">{{ group_length }}</h2>
            </div>
            <div v-else>
              <h2>{{ group_length }}</h2>
            </div>

            <div
              :class="{ disappear: !watchgroup }"
              class="profile-follow-modal"
            >
              <div>
                <div class="profile-follow-modal-title">
                  <div>
                    <h2>Group</h2>
                  </div>
                  <div class="profile-follow-modal-close">
                    <img
                      class="pointer"
                      @click="groupDetail"
                      src="https://img.icons8.com/ios/50/000000/close-window.png"
                    />
                  </div>
                </div>

                <div class="profile-follow-modal-content">
                  <UserGroup
                    v-for="group in userinfo.group"
                    :key="group.id"
                    :group="group"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="userinfo.username == myinfo.username" 
            class="profile-content-eachbox"
          >
            <div>
              <h2>INVITE</h2>
            </div>

            <div @click="inviteDetail">
              <h2 class="pointer">{{ invite_length }}</h2>
            </div>

            <div
              :class="{ disappear: !watchinvite }"
              class="profile-follow-modal"
            >
              <div>
                <div class="profile-follow-modal-title">
                  <div>
                    <h2>Invite</h2>
                  </div>
                  <div class="profile-follow-modal-close">
                    <img
                      class="pointer"
                      @click="inviteDetail"
                      src="https://img.icons8.com/ios/50/000000/close-window.png"
                    />
                  </div>
                </div>

                <div class="profile-follow-modal-content">
                  <UserInvite
                  v-for="invite in userinfo.invited"
                  :key="invite.id"
                  :invite="invite"
                  :myinfo="myinfo"
                  @getuserprofile="getuserprofile"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="profile-content-eachbox">
            <div :class="{disappear : !watchaddgroup}" class="profile-follow-modal">
              <div>
                <div class="profile-follow-modal-title">
                  <div>
                    <h2> Add Group </h2>
                  </div>
                  <div class="profile-follow-modal-close">
                    <img class="pointer" @click="addgroupDetail" src="https://img.icons8.com/ios/50/000000/close-window.png"/>
                  </div>
                </div>
              </div>
              <div class="profile-follow-modal-content">
                <div class="profile-modal-addgroup">
                  <div>
                    <label for="groupname">그룹 이름</label>
                    <input type="text" placeholder="그룹 이름" id="groupname" v-model.trim="form.name">
                  </div>
                  <div>
                    <label for="groupintroduce">그룹 소개</label>
                    <textarea id="groupintroduce" v-model="form.introduce">환영합니다!</textarea>
                  </div>
                  <div>
                    <img class="pointer" @click="addGroup" src="https://img.icons8.com/material-sharp/50/000000/ok--v1.png">
                    <img class="pointer" src="https://img.icons8.com/fluent-systems-filled/50/000000/cancel.png">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- todo 목록 -->
    <div class="profile-content-box">
      <div>
        <div class="profile-todobox-title">
          <h1>Schedule</h1>
        </div>

        <div class="profile-todobox-content">
          <ul class="profile-todobox-tab">
            <li @click="AllTodo" :class="{ current: all }">전체</li>
            <li @click="DoingTodo" :class="{ current: doing }">진행 중</li>
            <li @click="completedTodo" :class="{ current: completed }">완료</li>
          </ul>
          <div
            class="profile-todobox-tab-content"
            v-if="
              myinfo.username == userinfo.username ||
                (isFollowing && isFollowed)
            "
          >
            <UserTodo v-for="(todo, idx) in userTodo" :todo=
            
            "todo" :key="idx" />
          </div>
          <div class="profile-todobox-tab-content" v-else>
            <img src="https://img.icons8.com/ios-filled/50/000000/manual.png" />
            <h1>맞팔로우된 유저의 일정만 확인할 수 있습니다.</h1>
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
import { findUser } from "@/api/accounts.js";
import { makegroup } from "@/api/group.js";
// import '@/assets/accounts.css';
import UserTodo from '@/components/Profile/UserTodo.vue'
import UserFollower from '../../components/Profile/UserFollower.vue';
import UserFollowing from '../../components/Profile/UserFollowing.vue';
import UserGroup from '../../components/Profile/UserGroup.vue';
import UserInvite from '../../components/Profile/UserInvite.vue';

export default {
  name: 'Profile',
  components: {
    UserTodo,
    UserFollower,
    UserFollowing,
    UserGroup,
    UserInvite,
  },
  data() {
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
      watchfollower: false,
      watchfollowing: false,
      watchgroup: false,
      watchinvite: false,
      watchaddgroup: false,
      findFriend: '',
      auto: [],
      disappear: true,
      form: {
        name: '',
        introduce: '',
      }
    }
  },
  methods : {
    addGroup() {
      makegroup(
        this.form,
        (res) => {
          this.userinfo.group.push(res)
        },
        () => {
        }
      )
      this.getuserprofile();
      this.addgroupDetail();
    },
    closecompleted () {
      this.disappear = true;
    },
    inputkeyword(input) {
      this.findFriend = input;
      this.disappear = true;
    },
    autocompleted() {
      if (this.findFriend != '') {
        this.disappear = false;
        findUser(
          this.findFriend,
          (res) => {
            let data_list = [];
            for (const data of res.data) {
              data_list.push(data.username);
            }
            this.auto = data_list;
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.disappear = true;
      }
    },
    followingDetail() {
      this.watchfollowing = !this.watchfollowing;
      this.findFriend = '';
      this.disappear = true;
    },
    followerDetail() {
      this.watchfollower = !this.watchfollower;
    },
    groupDetail() {
      this.watchgroup = !this.watchgroup;
    },
    inviteDetail() {
      this.watchinvite = !this.watchinvite;
    },
    addgroupDetail () {
      this.watchaddgroup = !this.watchaddgroup
    },
    setuserprofile(res) {
      const saveuserInfo = JSON.stringify(res.data);
      sessionStorage.setItem('user', saveuserInfo);
      const getuserInfo = sessionStorage.getItem('user');
      this.userinfo = JSON.parse(getuserInfo);
      this.userTodo = this.userinfo.my_todo;
      this.followers = this.userinfo.followers;
      this.followings = this.userinfo.followings;
      const token = localStorage.getItem('jwt');
      this.$store.dispatch('userStore/GET_MEMBER_INFO', token);
    },
    getuserprofile() {
      userprofile(
        this.$route.query.name,
        (res) => {
          this.setuserprofile(res);
          for (let follow of this.myinfo.followings) {
            if (this.userinfo.username == follow.username) {
              this.isFollowing = true;
            }
          }
          for (let follow of this.myinfo.followers) {
            if (this.userinfo.username == follow.username) {
              this.isFollowed = true;
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    follow(user) {
      addfollow(
        user,
        () => {
          userprofile(
            this.$route.query.name,
            (res) => {
              this.setuserprofile(res);
            },
            (err) => {
              console.log(err);
            }
          );
          this.isFollowing = true;
        },
        (err) => {
          console.log(err);
        }
      );
      this.disappear = true;
      this.findFriend = '';
    },
    unfollow() {
      removefollow(
        this.userinfo.username,
        () => {
          this.isFollowing = false;
          userprofile(
            this.$route.query.name,
            (res) => {
              this.setuserprofile(res);
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          console.log('실패시', err);
        }
      );
    },
    AllTodo() {
      this.all = true;
      this.doing = false;
      this.completed = false;
      this.userTodo = this.userinfo.my_todo;
    },
    DoingTodo() {
      this.all = false;
      this.doing = true;
      this.completed = false;
      this.userTodo = this.userinfo.my_todo.filter((x) => {
        return x.completed == 'no';
      });
    },
    completedTodo() {
      this.all = false;
      this.doing = false;
      this.completed = true;
      this.userTodo = this.userinfo.my_todo.filter((x) => {
        return x.completed !== 'no';
      });
    },
  },
  created() {
    this.getuserprofile();
  },
  computed: {
    ...mapState({
      myinfo: (state) => state.userStore.userInfo,
      isLogin: (state) => state.userStore.isLogin,
    }),
    following_length() {
      if (
        this.userinfo.followings !== null &&
        this.userinfo.followings !== undefined
      ) {
        return this.userinfo.followings.length;
      } else {
        return 0;
      }
    },
    follower_length() {
      if (
        this.userinfo.followers !== null &&
        this.userinfo.followers !== undefined
      ) {
        return this.userinfo.followers.length;
      } else {
        return 0;
      }
    },
    group_length() {
      if (this.userinfo.group !== null && this.userinfo.group !== undefined) {
        return this.userinfo.group.length;
      } else {
        return 0;
      }
    },
    invite_length() {
      if (
        this.userinfo.invited !== null &&
        this.userinfo.invited !== undefined
      ) {
        return this.userinfo.invited.length;
      } else {
        return 0;
      }
    },
  },
};
</script>

<style scoped src="@/assets/accounts.css">
.profile-modal-addgroup {
  
}
.profile-modal-addgroup > div{
  margin-top: 20px;
}
.profile-modal-addgroup > div:last-child{
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}
</style>

