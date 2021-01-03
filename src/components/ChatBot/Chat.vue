<template>
  <div class="chatbot-container" width="100%">
    <div>
      <button @click="closeChat">V</button>
    </div>

    <HowToUse
    :help="help"
    @closeHelp="closeHelp"
    :class="{displayNone: !help}"/>
    <div>
      <div class="chatheader">
        <table width="100%">
          <tr>
            <td width="10%" align="left" class="pointer" title="바봇은 무엇인가요?">
              <img @click="gotohelp" src="https://img.icons8.com/clouds/50/000000/broken-robot.png"/>
            </td>
            <td width="64%"></td>
            <td width="1%" align="right">
              <span @click="clearBot"  class="pointer" title="초기화">
                <img src="https://img.icons8.com/bubbles/50/000000/trash.png"/>
              </span>
            </td>
            <td width="15%" align="right">
              <span @click="chatTrain" class="pointer">
                <img title="수리 중" v-if="train" class="spinner" src="https://img.icons8.com/offices/30/000000/spinner-frame-1.png"/>
                <img title="수리" v-else src="https://img.icons8.com/bubbles/50/000000/robot.png"/>
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div class="chatbody" id="chatbox">
        <div v-for="(chat, idx) in box" :key="idx">
          <div class="eachchatbox-position">
            <span>
              <img src="https://img.icons8.com/bubbles/50/000000/user-male.png"/>
            </span>
            <span>
              {{myinfo.username}}
            </span>
            <div class="userchatbox-position">
              <span width="50%"></span>
              <span>
                <p class="userchatbox">
                  {{ chat.userchat}}
                </p>
              </span>
              
            </div>
          </div>
          <div class="eachBotbox-position">
            <span><img src="https://img.icons8.com/bubbles/50/000000/broken-robot.png"/></span><span>바봇(BOT)</span>
            <span v-if="chat.tag == 'createaccount'">
              <p class="botchatbox"><router-link to="/signup">회원가입</router-link>하러가기</p>
            </span>
            <span v-else-if="chat.tag == 'login'">
              <p class="botchatbox"><router-link to="/login">로그인</router-link>하러가기</p>
            </span>
            <span v-else>
              <p class="botchatbox">{{ chat.botchat}}</p>
            </span>
          </div>
        </div>
        <div>
          <div v-if="box && box.length > 1"> <span  @click="scroll" class="pointer">채팅을 그만두고 싶다면 클릭!</span>
            <div @click="closeChat" class="pointer chat-bye">
              <img src="https://img.icons8.com/emoji/100/000000/waving-hand-medium-light-skin-tone.png"/>
              <h1>안녕!!</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="chatfooter">
        <table width="100%">
          <tr>
            <td width="85%" align="left">
              <input type="text" v-model.trim="chatText" class="chatInput" @keypress.enter="sendAsk">
            </td>
            <td width="15%" align="right">
              <button class="chatSend" @click="sendAsk"><img src="https://img.icons8.com/dotty/30/000000/filled-sent.png"/></button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { chatanswer, chattrain } from "@/api/chatbot.js"
import { mapState } from "vuex";
import HowToUse from './HowToUse.vue'

export default {
  data () {
    return {
      help: false,
      imgopacity: false,
      train: false,
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
      nowtag: '',
      height: 0,
      disappear: false,
    }
  },
  components: { 
    HowToUse
  },
  props : {
    chat: Boolean,
  },
  methods: {
    closeHelp (help) {
      this.help = help
    },
    gotohelp () {
      this.help = true
      this.imgopacity = false
    },
    sayno () {
      this.disappear = !this.disappear;
    },
    closeChat () {
      this.$emit('closeChat', !this.chat)
      this.box = []
      this.disappear = false
    },
    clearBot () {
      this.box = []
    },
    chatTrain () {
      this.train = true
      chattrain (
        this.trainform,
        () => {
          alert("수리가 완료되었습니다.")
          this.train = false
        },
        (err) => {
          console.log(err)
        }
      )
    },
    scroll () {
      const obj = document.getElementById("chatbox");
      // console.log('길이1!', obj.scrollHeight, obj.scrollTop)
      obj.scrollTop = obj.scrollHeight;
      // console.log(obj.scrollTop)
      console.log('qusgoTek,,')
    },
    getResponse () {
      const chatting = {'userchat': this.chatText, 'botchat': this.botText, 'tag': this.nowtag}
      console.log(chatting)
      this.box.push(chatting)
      this.chatText = ''
      console.log('뭐해..')
    },
    async sendAsk () {
      if (this.chatText !== '') {
          chatanswer (
          this.chatText,
          (res) => {
            console.log('대답은', res.data.anstext)
            this.botText = res.data.anstext
            this.nowtag = res.data.tag
            this.getResponse()
          },
          (err) => {
            console.log(err)
          }
        )        
      }
    },
  },
  watch: {
    box: function () {
      const obj = document.getElementById("chatbox");
      console.log('길이1!', obj.scrollHeight, obj.scrollTop)
      this.height = obj.scrollHeight;
      obj.scrollTop = this.height + 116
      // console.log(obj.scrollTop)
      console.log('qusgoTek,,')
    },
  },
  computed: {
    ...mapState({
      myinfo: (state) => state.userStore.userInfo,
    }),
  },
}
</script>

<style>
.chatbot-container {
  width: 50%;
}
.chatbot-container > div:first-child {
  background-color: #DDD;
}
.chatbot-container > div > button {
  width: 100%;
  border: 0px;
  cursor: pointer;
  background-color: #DDD;
}
.eachBotbox-position {
  text-align: left;
  padding: 5px 8px;
  margin-bottom: 5px;
}
.userchatbox-position {
  display: flex;
  position : relative; 
  width: 100%;
  justify-content: space-between;
}
.userchatbox {
  border: 1px solid;
  border-radius: 10px;
  background-color:white;
  padding: 5px 8px;
  word-break:break-all;
  width: 100%;
  right: 0;
  text-align: left;
}
.botchatbox {
  position : relative; 
  border: 1px solid;
  border-radius: 10px;
  background-color:white;
  padding: 5px 8px;
  max-width: 100%;
  width: 40%;
  text-align: left;
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
  overflow: auto;
  position : relative; 
  bottom:0;
  height: 450px;
  background-color: #BBCCDD;
}
.chatbody > div:first-child {
  /* position: fixed; */
  margin-top: 10px;
}
.chatbody > div:last-child {
  /* position: fixed; */
  position: relative;
  bottom: 0;
  height: 250px;
}
.chatbody > div:last-child div:first-child > div {
  /* position: fixed; */
  
}
.chatbodyDisappear {
  display: none;
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
.chat-bye {
  position: relative;
  margin: 70px 0px 70px 0px;
  display: flex;
  justify-content: space-evenly;
}
.spinner {
  animation:spin 1000ms infinite linear;
}
@keyframes spin { 100%{ transform: rotate(360deg); } }

</style>