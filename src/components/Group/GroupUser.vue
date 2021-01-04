<template>
  <div>
    <div class="profile-follow-modal-each" v-if="user.username == myinfo.username">
      <span class="pointer" title="프로필로 이동하기" @click="goToprofile"> <img title="서로 팔로우 중이에요!" src="https://img.icons8.com/material-sharp/24/000000/checked-2--v1.png"/> {{ user.username }} </span>
    </div>
    <div class="profile-follow-modal-each" v-else-if="isFollowing" >
      <span class="pointer" title="프로필로 이동하기" @click="goToprofile"> <img title="서로 팔로우 중이에요!" src="https://img.icons8.com/material-sharp/24/000000/checked-2--v1.png"/> {{ user.username }} </span>
      <span> <img class="pointer" title="팔로우 취소" @click="unfollow" src="https://img.icons8.com/material-sharp/24/000000/cancel--v1.png"/> </span>
    </div>
    <div class="profile-follow-modal-each" v-else>
      <span class="pointer" title="프로필로 이동하기" @click="goToprofile"> <img title="상대의 팔로우를 기다리고 있어요!" src="https://img.icons8.com/material-rounded/24/000000/unchecked-checkbox.png"/> {{ user.username }} </span>
      <span> <img class="pointer" title="팔로우" @click="follow" src="https://img.icons8.com/metro/26/000000/plus.png"/> </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { addfollow } from "@/api/accounts.js";
import { removefollow } from "@/api/accounts.js";

export default {
  props: {
    user: Object,
  },
  data () {
    return {
      isEach: false,
      isFollowing: false,
      isFollower: false,
    }
  },
  methods: {
    follow () {
      addfollow(
        this.user.username,
        () => {
        this.isFollowing = true
        },
        (err) => {
          console.log(err)
        }
      )
      this.disappear = true;
      this.findFriend = ""
      
    },
    unfollow () {
      removefollow(
        this.user.username,
        () => {
          this.isFollowing = false
        },
        (err) => {
          console.log('실패시', err)
        }
      )
    },
    goToprofile () {
      this.$router.push({name: 'Profile', query: {name: this.user.username}})
    },
    isEachfollower () {
      for (let follow of this.myinfo.followings) {
        if (follow.username == this.user.username) {
          this.isFollowing = true;
        }
      }

      for (let follow of this.myinfo.followers) {
        if (follow.username == this.user.username) {
          this.isFollower = true;
        }
      }
      if (this.isFollowing && this.isFollower) {
        this.isEach = true;
      }
    },
  },
  created () {
    this.isEachfollower();
  },
  computed: {
    ...mapState({
      myinfo: (state) => state.userStore.userInfo,
      isLogin: (state) => state.userStore.isLogin,
    }),
  },
}
</script>

<style>

</style>