<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Welcome to Bling-blong!
          </h1>
          <br>
          <h2 class="subtitle">
            Another to-do app that you will never use since your life is already too deep in a mess.
          </h2>
        </div>
      </div>
    </section>

    <button @click="show=true" class="button is-large is-primary is-outlined">Sign in / Join</button>
    <transition name="modal">
    <div v-if="show" class="modal-mask" @click="show=false">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>

          <div class="modal-header">
            <slot name="header">
            <div class="columns">
              <div class="column">
                <p class="title">Sign In</p>
              </div>
              <div class="column">
                <p class="title">Join</p>
              </div>
            </div>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <p class="control">
                  <input v-model="user.username" class="input" type="text" placeholder="username">
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                  <input v-model="user.password" class="input" type="password" placeholder="password">
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <p class="control">
                  <input v-model="user.name" class="input" type="text" placeholder="name">
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                  <input v-model="user.email" class="input" type="text" placeholder="email">
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                  <input v-model="user.username" class="input" type="text" placeholder="username">
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                  <input v-model="user.password" class="input" type="password" placeholder="password">
                  </p>
                </div>
              </div>
            </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
            <div class="columns">
              <div class="column">
                <button class="button is-primary is-outlined" @click="signin(user)">
                  Sign in
                </button>
              </div>
              <div class="column">
                <button class="button is-primary is-outlined" @click="join(user)">
                  Join
                </button>
              </div>
            </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
    </transition>

  </div>
</template>

<script type"text/javascript" src="../assets/js/scripts.js"></script>
<script>
export default {
  data () {
    return {
      show: false,
      user: {}
    }
  },
  methods: {
    signin: function (user) {
      this.show = false
      this.$store.dispatch('signin', user)
      this.user = {}
    },
    join: function (user) {
      this.show = false
      console.log(user)
      this.$store.dispatch('register', user)
      this.user = {}
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
