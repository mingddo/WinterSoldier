<template>
  <div class="signupbox">
    <h1>Signup</h1>
    <div class="signup-form">
      <div>
        <label for="username">username </label>
        <input type="text" name="username" id="username" v-model="username">
      </div>
      <div>
        <label for="password">password</label>
        <input type="password" name="password" id="password" v-model="password">
      </div>
      <div>
        <label for="passwordConfirmation">passwordConfirmation</label>
        <input type="password" name="passwordConfirmation" id="passwordConfirmation" v-model="passwordConfirmation">
      </div>
      <button @click="onSignup">Signup</button>
    </div>
  </div>
</template>

<script>
import { usersignup } from "@/api/accounts.js";
import '@/assets/accounts.css';

export default {
  name: 'Signup',
  data () {
    return {
      username:"",
      password:"",
      passwordConfirmation:"",
      
    }
  },
  methods: {
    onSignup() {
      if (this.password === this.passwordConfirmation) {
        console.log(this.username)
        usersignup(
          {username:this.username,
          password:this.password,
          passwordConfirmation:this.passwordConfirmation}
          ,
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log(err)
            if (this.username === '') {
              alert('아이디를 입력해주세요.')
            } else if (this.password === '') {
              alert('비밀번호를 입력해주세요.')
            } else {
              alert('이미 존재하는 아이디입니다.')
            }
          }
        )
      } else {
        alert('비밀번호가 일치하지 않습니다.')
      }
    }
  }
}
</script>

<style>

</style>