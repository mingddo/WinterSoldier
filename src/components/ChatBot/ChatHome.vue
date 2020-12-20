<template>
  <div class="chatbot-container">
    <div :class="{displayNone : chat | help}">
      <img src="https://www.flaticon.com/svg/static/icons/svg/2040/2040653.svg" alt="" width="10%" @click="playchatbot" class="fixed-position" :class="{imgopacity : imgopacity}">
      <div class="border button-position">
        <button @click="gotochat" :class="{displayNone : !imgopacity}">
          챗봇 이용하기
        </button><br>
        <button @click="gotohelp" :class="{displayNone : !imgopacity}">
          도움말
        </button>
      </div>
      
    </div>
    <Chat 
    :chat="chat"
    @closeChat="closeChat"
    class="fixed-position"
    :class="{displayNone : !chat}"/>
    <HowToUse
    :help="help"
    @closeHelp="closeHelp"
    class="fixed-position"
    :class="{displayNone: !help}"/>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import HowToUse from './HowToUse.vue'


export default {
  data () {
    return {
      help: false,
      chat: false,
      imgopacity: false
    }
  },
  components: { 
    Chat,
    HowToUse },
  methods: {
    closeChat (chat) {
      this.chat = chat
    },
    closeHelp (help) {
      this.help = help
    },
    gotohelp () {
      this.help = true
      this.imgopacity = false
    },
    gotochat () {
      this.chat = true
      this.imgopacity = false
    },
    playchatbot () {
      this.imgopacity = !this.imgopacity
    },
  },

    }
</script>

<style>
.displayNone {
  display: none;
}
.button-position {
  position: fixed;
  bottom: 30px;
  right: 10px;
}
.fixed-position {
  position: fixed;
  bottom: 0;
  right: 0;
}
.imgopacity {
  opacity: 0.4;
}
</style>