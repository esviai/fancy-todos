<template>
  <div class="container">
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item" href="">
          <img src="../assets/logo.png" alt="Fancy Todos" style="max-height:50px;">
        </a>
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu">
        <a v-if="token" @click="signout" class="nav-item">Sign out</a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    token () {
      return this.$store.getters.token
    }
  },
  methods: {
    signout: function () {
      this.$store.dispatch('signout')
    }
  }
}
</script>
