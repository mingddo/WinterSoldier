<template>
  <div>
    <div class="profile-follow-modal-each" v-if="isEach">
      <span title="프로필로 이동하기" class="pointer" @click="changequery"><img title="서로 팔로우 중이에요!" src="https://img.icons8.com/material-sharp/24/000000/checked-2--v1.png"/>{{ follower.username }}</span>
      <span><img class="pointer" title="팔로우 취소" @click="followcancel" src="https://img.icons8.com/material-sharp/24/000000/cancel--v1.png"/></span>
    </div>
    <div class="profile-follow-modal-each" v-else>
      <span title="프로필로 이동하기" class="pointer" @click="changequery"> <img title="아직 팔로우하지 않았어요!" src="https://img.icons8.com/material-rounded/24/000000/unchecked-checkbox.png"/>{{ follower.username }}</span>
      <span><img class="pointer" title="팔로우" @click="eachfollow" src="https://img.icons8.com/metro/26/000000/plus.png"/></span>
    </div>
  </div>
</template>

<script>
import { addfollow } from "@/api/accounts.js";
import { removefollow } from "@/api/accounts.js";
export default {
  data () {
    return {
      isEach: false,
    }
  },
  props: {
    follower: Object,
    followings: Array,
  },
  methods : {
    changequery() {
      this.$router.replace({query: {name: this.follower.username }})
      .catch(err => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      })
    },
    followcancel() {
      removefollow(
        this.follower.username,
        (res) => {
          console.log('성공시', res)
          this.$emit('getuserprofile')
          this.isEach = false;
        },
        (err) => {
          console.log('실패시', err)
        }
      )
    },
    eachfollow () {
      addfollow(
        this.follower.username,
        (res) => {
          console.log('성공시', res)
          this.$emit('getuserprofile')
          this.isEach = true;
        },
        (err) => {
          console.log('실패시', err)
        }
      )
    },
    isEachfollower () {
      for (let fwr of this.followings) {
        if (fwr.username == this.follower.username) {
          this.isEach = true
        }
      }
    },
  },
  created () {
    this.isEachfollower();
  },

}
</script>

<style>

</style>