<template>
  <div class="chatbot-container">
    <div @click="gotochat">
      <img class="fixed-position chatbot__img" src="https://www.flaticon.com/svg/static/icons/svg/2040/2040653.svg" alt="" width="70px">
      
    </div>
    <Chat 
    :chat="chat"
    @closeChat="closeChat"
    class="fixed-position"
    :class="{displayNone : !chat}"/>
  </div>
</template>

<script>
import Chat from './Chat.vue'

export default {
  data () {
    return {
      chat: false,
    }
  },
  components: { 
    Chat,
  },
  methods: {
    closeChat (chat) {
      this.chat = chat
    },
    gotochat () {
      this.chat = true
      this.imgopacity = false
    },
  },

    }
</script>

<style>
.displayNone {
  display: none;
}
.fixed-position {
  position: fixed;
  bottom: 0;
  right: 0;
}
.chatbot__img {
  transition: all 300ms ease;
}

.chatbot__img:hover {
  transform: scale(1.2) translate(-10%, -10%);
}

</style>