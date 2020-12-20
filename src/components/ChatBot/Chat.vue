<template>
  <div class="chatbot-container">
    <div>
      <button width="10%" align="right" @click="closeChat">V</button>
    </div>
    <div>
      <div class="chatheader">
        <table width="100%">
          <tr>
            <td width="50%" align="left">
              my Chat
            </td>
            <td width="70%" align="right">
              <span @click="clearBot"  style="cursor:pointer;">
                clear!
              </span>
            </td>
            <td width="20%" align="right">
              <span @click="chatTrain" style="cursor:pointer;">
                {{train}}
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div class="chatbody" id="chatbox">
        <div v-for="(chat, idx) in box" :key="idx">
          <div class="eachchatbox-position">
            <span class="eachchatbox">
              {{ chat.userchat}}
            </span>
          </div>
          <div class="eachBotbox-position">
            <span class="eachchatbox">
              {{ chat.botchat}}
            </span>
          </div>
        </div>
      </div>
      <div class="chatfooter">
        <table width="100%">
          <tr>
            <td width="85%" align="left">
              <input type="text" v-model.trim="chatText" class="chatInput" @keyup.enter="sendAsk">
            </td>
            <td width="15%" align="right">
              <button class="chatSend" @click="sendAsk">SEND</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { chatanswer, chattrain } from "@/api/chatbot.js"

export default {
  data () {
    return {
      train: 'train',
      trainform: {
        tag: '',
        patterns: '',
        responses: '',
      },
      box: [],
      chatBox: [],
      botBox: [],
      chatText: '',
      botText: '',
    }
  },
  props : {
    chat: Boolean,
  },
  methods: {
    closeChat () {
      this.$emit('closeChat', !this.chat)
    },
    clearBot () {
      this.box = []
    },
    chatTrain () {
      this.train = 'ok, training'
      chattrain (
        this.trainform,
        (res) => {
          alert(res.data.result)
          console.log('성공')
          this.train = 'train'
        },
        (err) => {
          console.log(err)
        }
      )
    },
    getResponse () {
      const chatting = {'userchat': this.chatText, 'botchat': this.botText}
      this.box.push(chatting)
      // console.log(chatting)
      this.chatText = ''  
      // console.log(this.box)
    },
    async sendAsk () {
      if (this.chatText !== '') {
          chatanswer (
          this.chatText,
          (res) => {
            console.log(res.data.anstext)
            this.botText = res.data.anstext
            this.getResponse()
          },
          (err) => {
            console.log(err)
          }
        )        
      }
    },
  },
}
</script>

<style>
.chatbot-container {
  width: 50%;
}
.eachBotbox-position {
  text-align: left;
  padding: 5px 8px;
  margin-bottom: 5px;
}
.eachchatbox {
  border: 1px solid;
  border-radius: 10px;
  background-color:white;
  padding: 5px 8px;
}
.eachchatbox-position {
  text-align: right;
  padding: 5px 8px;
  margin-bottom: 5px;
}
.chatInput {
  padding: 10px 0;
  width: 100%;
  border: solid 0px #000;
}
.chatSend {
  padding: 10px 0;
  width: 100%;
}
.chatheader {
  /* position: fixed; */
  left: 0;
  top: 0;
  width: 100%;
  padding:10px 0;
  background-color: #DDD;
  color: #008;
  text-align:center;
}
.chatbody {
  /* position: fixed; */
  overflow:scroll;
  position : relative; 
  bottom:0;
  height: 450px;
  background-color: #BBCCDD;
}
.chatfooter {
  /* position: fixed; */
  left: 0;
  bottom: 0;
  width: 100%;
  padding:10px 0;
  background-color: #FFF;
  color: #008;
  text-align:center;
}
</style>