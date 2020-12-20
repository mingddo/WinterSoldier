<template>
  <div>
    <h1> 사용법 </h1>
    <hr>
    <p> 안녕하세요. 사이트 도우미 챗봇 바봇(bot) 이에요!</p>
    <p> 여러분들께 편하게 안내를 드리고 싶지만 </p>
    <p> 제가 너무 멍청해서 영어만 읽을 수 있어요 </p>
    <p> 불편하겠지만 꼭 영어로 질문해주세요! </p>
    <p> 놀랍게도 대답은 한글로 한답니다; </p>
    <hr>
    <p> 예시를 도여드릴게요!</p>
    <p> "Hello" 라고 인사해주시면 저도 같이 인사를 드려요</p>
    <p> "who are you?" 라고 하면 제 소개를 한답니다.</p>
    <p> "what is this site?" 라고 하면 저희 사이트를 소개해드려요.</p>
    <p> 이외 여러패턴이 있는데 아직 귀찮아서 다 탑재는 못했어요 </p>
    <p> 대답이 너무 멍청하면 Train 을 눌러주세요. 다시 학습할 수 있어요. </p>
    <p> 현재 작동되는 패턴은 인사말, 계정 생성 방법, 사이트 소개, 투두, 도움안내 입니다.</p>
    <p> 백엔드 intents.json 파일을 활용해 새로운 패턴을 넣어주세요~</p>
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

</style>