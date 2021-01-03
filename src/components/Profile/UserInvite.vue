<template>
  <div>
    <h1>날 초대한 그룹! </h1>
    {{ invite }}
    <button>yes</button>
    <button>no</button>
  </div>
</template>

<script>
export default {
  props: {
    invite: Object,
  }
}
</script>

<style>

</style>