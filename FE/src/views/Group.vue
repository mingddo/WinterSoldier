<template>
  <div class="profilebox">
    <div class="group-content-box">
      <div class="group-img-box">
        <div class="group-content-delete">
          <div v-if="myinfo.username == groupinfo.master" class="pointer" @click="Groupdelete">
            <span><img src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"/></span>
          </div>  
          <div v-else class="pointer" @click="Memberdelete">
            <span><img src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"/></span>
          </div>
        </div>
        <div>
          <span><img src="https://img.icons8.com/dotty/100/000000/group-task.png"/></span>
          <span> <h1> {{ groupinfo.name }}</h1> </span>
        </div>
        <div>
          <p>{{ groupinfo.introduce }}</p>
        </div>
        <div class="profile-img-invite-btn">
            <div v-if="myinfo.username == groupinfo.master" class="pointer" @click="masterDetail">
              <span><img src="https://img.icons8.com/dotty/50/000000/ice-king.png"/></span>
              <span><h2> MASTER </h2></span>
              <span><h4>{{ groupinfo.master }}</h4></span>
            </div>
            <div v-else>
              <span><img src="https://img.icons8.com/dotty/50/000000/ice-king.png"/></span>
              <span><h2> MASTER </h2></span>
              <span><h4>{{ groupinfo.master }}</h4></span>
            </div>
            <div @click="userDetail" class="pointer">
              <span><img src="https://img.icons8.com/dotty/50/000000/castle.png"/></span>
              <span><h2> MEMBER </h2></span>
              <span><h4>{{ group_user_length }}</h4></span>
            </div>
          <div :class="{disappear : !watchuser}" class="profile-follow-modal">
            <div>
              <div class="profile-follow-modal-title">
                <div>
                  <h2> USER </h2>
                </div>
                <div class="profile-follow-modal-close">
                  <img class="pointer"  @click="userDetail" src="https://img.icons8.com/ios/50/000000/close-window.png"/>
                </div>
              </div>
              <div>
                <div>
                  <input placeholder="유저 이름을 입력하세요" @dblclick="closecompleted" type="text" v-model.trim="findFriend" @keyup="autocompleted" title="더블클릭시 자동완성 꺼집니다">
                  <div v-if="findFriend && disappear">
                    <div v-if="!exist && invited"> 대답을 기다리고 있어요 </div>
                    <div v-else-if="!exist && !invited"> <button @click="invite"> 초대 </button> </div>
                    <div v-else>이미 그룹원입니다.</div>
                  </div>
                </div>
                <div class="profile-follow-input-autocompleted" :class="{disappear: disappear}">
                  <div v-for="a in auto" :key=a.id>
                    <span class="pointer" @click="inputkeyword(a)"> {{ a }} </span>
                  </div>
                </div>
              </div>
              <div class="profile-follow-modal-content">
                <GroupUser 
                v-for="user in userlist"
                :key="user.id"
                :user="user"/>
              </div>
            </div>
          </div>

          <div :class="{disappear : !watchmaster}" class="profile-follow-modal">
            <div>
              <div class="profile-follow-modal-title">
                <div>
                  <h2> USER </h2>
                </div>
                <div class="profile-follow-modal-close">
                  <img class="pointer"  @click="masterDetail" src="https://img.icons8.com/ios/50/000000/close-window.png"/>
                </div>
              </div>
              <div class="profile-follow-modal-content">
                <div v-for="user in userlist" :key="user.id">
                  <div class="profile-follow-modal-each">
                    <span>{{ user.username }}</span>
                    <span v-if="user.username !== myinfo.username" class="pointer" @click="Masterchange(user.username)"><img src="https://img.icons8.com/fluent-systems-filled/24/000000/change-user-male.png"/></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="profile-content-box">
      <div>
        <div class="profile-todobox-title">
          <h1> Schedule </h1>
          <i class="pointer fas fa-redo-alt" @click="reload"></i>
        </div>
        <GroupCalendar 
        :groupinfo="groupinfo"/>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { groupdetail } from "@/api/group.js";
// import { approveinvite } from "@/api/group.js";
import { invitegroup } from "@/api/group.js";
import { deletegroup } from "@/api/group.js";
import { deletemember } from "@/api/group.js";
import { changemaster } from "@/api/group.js";
import { findUser } from "@/api/accounts.js";
import '@/assets/accounts.css';
import GroupUser from '../components/Group/GroupUser.vue'
import GroupCalendar from '../components/Group/GroupCalendar.vue';
export default {
  components: { GroupUser, GroupCalendar },
  data () {
    return {
      watchuser: false,
      watchmaster: false,
      groupinfo: {},
      userlist: [],
      findFriend: '',
      auto: [],
      disappear: true,
      exist: false,
      invited: false,
    }
  },
  methods: {
    reload () {
      location.reload();
    },
    Memberdelete() {
      if (confirm('정말로 그룹을 탈퇴하시겠습니까?')) {
        deletemember(
          this.groupinfo.id,
          this.myinfo.username,
          () => {
            this.$router.push({name: 'Home'})
          }, {}
        )
      }
    },
    Groupdelete () {
      if (confirm('정말로 그룹을 삭제하시겠습니까?')) {
      deletegroup(
        this.groupinfo.id,
        () => {
          this.$router.push({name: 'Home'})
        },{}
      )
      
      }
    },
    Masterchange(user) {
      if (confirm(`${user}님께 그룹장을 위임하시겠습니까?`)) {
      changemaster(
        this.groupinfo.id,
        user,
        {}, {} )
      }
      this.$router.push({name: 'Home'})
    },
    invite () {
      invitegroup(
        this.groupinfo.id,
        this.findFriend,
        () => {
          alert(`${this.findFriend} 님을 그룹에 초대했습니다.`)
        },
        () => {
        }
      )
      this.invited = true
    },
    closecompleted () {
      this.disappear = true;
      this.exist = false;
      this.invited = false;
    },
    inputkeyword (input) {
      this.findFriend = input
      this.disappear = true;
      for (let user of this.userlist) {
        if (this.findFriend == user.username) {
          this.exist = true;
          this.invited = false;
          break;
        }
      }

      for (let user of this.groupinfo.inviting) {
        if (this.findFriend == user.username) {
          this.invited = true;
          this.exist = false;
          break;
        }
      }
    },
    autocompleted () {
      this.exist = false;
      this.invited = false;
      if (this.findFriend != "") {
        this.disappear = false
      findUser(
        this.findFriend,
        (res) => {
          let data_list = []
          for (const data of res.data) {
            data_list.push(data.username)
          }
          this.auto = data_list
        },
        (err) => {
          console.log(err)
        })
      } else {
        this.disappear = true
      }
    },
    userDetail () {
      this.watchuser = !this.watchuser
      this.findFriend = ""
      this.exist = false,
      this.invited = false
    },
    masterDetail () {
      this.watchmaster = !this.watchmaster
    },
    setGroupInfo (res) {
      const savegroupInfo = JSON.stringify(res.data);
      sessionStorage.setItem('group', savegroupInfo)
      const getgroupInfo = sessionStorage.getItem('group')
      this.groupinfo = JSON.parse(getgroupInfo)
      this.userlist = this.groupinfo.user
    },
    getGroupInfo () {
      groupdetail (
        this.$route.query.groupid,
        (res) => {
          this.setGroupInfo(res);
        },
        (err) => {
          console.log(err)
        }
      )
    },
    
  },
  created () {
    this.getGroupInfo();
  },
  computed: {
    group_user_length () {
      if (this.userlist != null && this.userlist != undefined) {
        return this.userlist.length
      } else {
        return 0
      }
    },
    ...mapState({
      myinfo: (state) => state.userStore.userInfo,
    }),
  }
}
</script>

<style>
.groupbox {
  /* flex: 8 8 80%; */
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start; */
  align-items: center;
  /* padding: var(--padding) calc(var(--padding) * 2); */
}
.group-content-box {
  width:80%;
  height: 20%;
  /* display: flex; */
  /* justify-content: space-between; */
}
.group-content-box > div {
  padding: 5px;
  border: 1px solid;
  width: 100%;
}
.group-img-box {
  position: relative;
  width:50%;
  align-items: center;
  margin: auto;
}
.group-content-delete {
  position: absolute;
  right: 0;
  top:0;
}
</style>