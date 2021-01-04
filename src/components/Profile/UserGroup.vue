<template>
  <div>
    <div class="profile-follow-modal-each">
      <span> <img src="https://img.icons8.com/small/24/000000/group-foreground-selected.png"/> {{ group.name }} </span>
      <span> <img @click="goToGroupPage" class="pointer" src="https://img.icons8.com/material/24/000000/move-right.png"/> </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: Object,
  },
  methods : {
    goToGroupPage () {
      this.$router.push({ name: 'Group', query: {groupid: this.group.id, user: this.group.user } })
    },
  },
}
</script>

<style>

</style>

