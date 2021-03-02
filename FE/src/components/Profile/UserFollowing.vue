<template>
  <div>
    <div class="profile-follow-modal-each" v-if="isEach" >
      <span class="pointer" title="프로필로 이동하기" @click="changequery"> <img title="서로 팔로우 중이에요!" src="https://img.icons8.com/material-sharp/24/000000/checked-2--v1.png"/> {{ following.username }} </span>
      <span> <img class="pointer" title="팔로우 취소" @click="followcancel" src="https://img.icons8.com/material-sharp/24/000000/cancel--v1.png"/> </span>
    </div>
    <div class="profile-follow-modal-each" v-else>
      <span class="pointer" title="프로필로 이동하기" @click="changequery"> <img title="상대의 팔로우를 기다리고 있어요!" src="https://img.icons8.com/material-rounded/24/000000/unchecked-checkbox.png"/> {{ following.username }} </span>
      <span> <img class="pointer" title="팔로우 취소" @click="followcancel" src="https://img.icons8.com/material-sharp/24/000000/cancel--v1.png"/> </span>
    </div>
  </div>
</template>

<script>
import { removefollow } from "@/api/accounts.js";

export default {
  props: {
    following: Object,
    followers: Array,
  },
  data () {
    return {
      isEach: false,
    }
  },
  methods: {
    changequery() {
      this.$router.replace({query: {name: this.following.username }})
      .catch(err => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      })
    },
    followcancel() {
      removefollow(
        this.following.username,
        () => {
          this.$emit('getuserprofile')
          this.isEach = false;
        },
        (err) => {
          console.log('실패시', err)
        }
      )
    },
    isEachfollower () {
      for (let fwg of this.followers) {
        if (fwg.username == this.following.username) {
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