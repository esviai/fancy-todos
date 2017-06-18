<template>
  <div>
    <tasks v-if="token"></tasks>
    <signin v-else></signin>
  </div>
</template>

<script>
import signin from '@/components/signin'
import tasks from '@/components/tasks'

export default {
  name: 'main',
  components: {
    signin,
    tasks
  },
  computed: {
    token () {
      return this.$store.getters.token
    }
  },
  created: function () {
    this.$store.commit('setToken')
  },
  methods: {
    coba: function () {
      console.log('coba lah')
    }
  }
}
</script>
