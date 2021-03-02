<template>
  <div class="signupbox">
    <div class="login__title">회원가입</div>
    <div class="signup-form">
      <div>
        <label for="username">아이디 </label>
        <input type="text" name="username" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </div>
      <div>
        <label for="passwordConfirmation">비밀번호 확인</label>
        <input
          @keyup.enter="onSignup"
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          v-model="passwordConfirmation"
        />
      </div>
      <button @click="onSignup">회원가입</button>
    </div>
  </div>
</template>

<script>
import { usersignup } from '@/api/accounts.js';
// import '@/assets/accounts.css';

export default {
  name: 'Signup',
  data() {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
    };
  },
  methods: {
    onSignup() {
      if (this.password === this.passwordConfirmation) {
        console.log(this.username);
        usersignup(
          {
            username: this.username,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation,
          },
          (res) => {
            console.log(res);
            alert('환영합니다!');
            this.$router.push({ name: 'Login' });
          },
          (err) => {
            console.log(err);
            if (this.username === '') {
              alert('아이디를 입력해주세요.');
            } else if (this.password === '') {
              alert('비밀번호를 입력해주세요.');
            } else {
              alert('이미 존재하는 아이디입니다.');
            }
          }
        );
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    },
  },
};
</script>

<style scoped src="@/assets/accounts.css"></style>
