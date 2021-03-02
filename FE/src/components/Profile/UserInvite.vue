<template>
  <div>
    <div class="profile-follow-modal-each">
      <span class="pointer"> <img src="https://img.icons8.com/small/24/000000/group-foreground-selected.png"/> {{ invite.name }} </span>
      <span> 
        <img class="pointer" title="초대 수락" @click="approvalGroup" src="https://img.icons8.com/material-sharp/24/000000/ok--v1.png"/>
        <img class="pointer" title="초대 거절" @click="denyGroup" src="https://img.icons8.com/fluent-systems-filled/24/000000/cancel.png"/>
      </span>
    </div>
  </div>
</template>

<script>
import { denyinvite } from "@/api/group.js";
import { approveinvite } from "@/api/group.js";
export default {
  props: {
    invite: Object,
    myinfo: Object,
  },
  methods: {
    approvalGroup () {
      approveinvite(
        this.invite.id,
        this.myinfo.username,
        () => {
          this.$emit('getuserprofile')
          if (confirm(`환영합니다! 그룹페이지로 이동하시겠습니까?`)) {
            this.$router.push({ name: 'Group', query: {groupid: this.invite.id, user: this.invite.user } })
          }
        },
        (err) => {
          console.log(err)
        }
      )
    },
    denyGroup () {
      denyinvite(
        this.invite.id,
        this.myinfo.username,
        () => {
          this.$emit('getuserprofile')
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },
}
</script>

<style>

</style>