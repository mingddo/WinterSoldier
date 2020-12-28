<template>
  <div>
    <div v-if="isEach"  @click="changequery">
      {{ following.username }}
      우리는 이제 칭구친구!!!!
      <button @click="followcancel"> 취소!! </button>
    </div>
    <div v-else>
      {{ following.username }}
      아직 기다리는중!!
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