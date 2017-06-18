<template>
  <div class="container">
    <div class="columns">
      <div class="column is-offset-one-quarter is-half">
        <table class="table is-striped">
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Categories</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks">
              <td>
                <span v-if="task.done" @click="done(task)" class="icon is-medium"><i class="fa fa-check-square-o"></i></span>
                <span v-else @click="done(task)" class="icon is-medium"><i class="fa fa-square-o"></i></span>
              </td>
              <td>{{task.todo}}</td>
              <td>
                <span v-for="category in task.categories" class="tag is-light is-medium">{{category}}</span>
              </td>
              <td>
                <span @click="showUpdate(task)" class="icon is-medium is-primary has-text-primary"><i class="fa fa-edit"></i></span>
                <span @click="destroy(task)" class="icon is-medium has-text-danger"><i class="fa fa-trash"></i></span>
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        <div class="field is-grouped">
          <p class="control is-expanded"><input v-model="newTask.todo" class="input" type="text" placeholder="New Task"></p>
          <p class="control is-expanded"><input v-model="newTask.categories" class="input" type="text" placeholder="Categories (separated by comma)"></p>
          <a @click="create(newTask)" class="button is-primary is-outlined">Create</a>
        </div>
      </div>
    </div>
    <div v-if="isActive" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit</p>
          <button @click="isActive=false" class="modal-close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Task: </label>
            <p class="control is-expanded"><input v-model="editTask.todo" class="input" type="text" placeholder="New Task"></p>
          </div>
          <br>
          <div class="field">
            <label class="label">Categories: </label>
            <p class="control is-expanded"><input v-model="editTask.categories" class="input" type="text" placeholder="Categories (separated by comma)"></p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a @click="update(editTask)" class="button is-primary is-outlined">Edit</a>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      newTask: {},
      task: {},
      editTask: {},
      isActive: false
    }
  },
  created: function () {
    this.$store.dispatch('getTasks')
  },
  computed: {
    ...mapGetters([
      'tasks'
    ])
    // tasks () {
    //   return this.$store.getters.tasks
    // }
  },
  methods: {
    done: function (task) {
      console.log('done loh')
      this.$store.dispatch('done', task)
    },
    showUpdate: function (task) {
      this.isActive = true
      this.editTask = {...task}
      this.editTask.categories = this.editTask.categories.join(', ')
    },
    update: function (task) {
      console.log(task._id)
      this.$store.dispatch('update', task)
      this.editTask = {}
      this.isActive = false
    },
    destroy: function (task) {
      this.$store.dispatch('destroy', task)
    },
    create: function (newTask) {
      this.$store.dispatch('create', newTask)
      this.newTask = {}
    }
  }
}
</script>
