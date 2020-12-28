<template>
  <div>
    
    <div v-if="isEach">
      <!-- <router-link :to="{name: 'Profile', query: {name: follower.username  }}" replace :key="$route.fullPath">{{ follower.username }}</router-link> -->
      <!-- <router-link :to="{name: 'Home'}">{{ follower.username }}</router-link> -->
      <div @click="changequery">{{ follower.username }}</div>
      우리는 이제 칭구친구!!!!
      <button @click="followcancel"> 취소!! </button>
    </div>
    <div v-else>
      {{ follower.username }}
      우리 친구할래..?ㅎ
      <button @click="eachfollow"> 팔로우하기</button>
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