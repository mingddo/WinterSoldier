<template>
  <div class="chat-help">
    <h1> 사용법 </h1>
    <hr>
    <p> 안녕하세요. 사이트 도우미 챗봇 바봇(bot) 이에요!</p>
    <hr>
    <p>
      여러분의 질문에 대답을 할 수 있어요
    </p>
    <p>
      엉뚱한 말을 한다면 우측의 수리 버튼을 눌러주세요!
    </p>
    <p>
      채팅을 그만하고 싶다면 채팅창 최상단의 버튼을 눌러주세요
    </p>
    <p>
      혹은 채팅창 아래의 안내 문구를 따라 종료하셔도 됩니다.
    </p>
    <p>
      채팅 내용을 초기화하고 싶다면 수리 버튼 좌측의 초기화 버튼을 눌러주세요.
    </p>

    <button @click="closeHelp"> 닫기 </button>
  </div>
</template>

<script>
export default {
  props: {
    help: Boolean,
  },
  methods: {
    closeHelp () {
      this.$emit('closeHelp', !this.help)
    },
  }
}
</script>

<style>
.chat-help {
  position: fixed;
  border: 1px solid;
  border-radius: 10px;
  padding: 10px;
  right: 10;
  margin: auto;
  background-color: white;
  z-index: 1;
}
</style>