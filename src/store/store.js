import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    tasks: [],
    token: null
  },
  getters: {
    tasks (state) {
      return state.tasks
    },
    token (state) {
      return state.token
    }
  },
  mutations: {
    setTasks (state, tasks) {
      state.tasks = tasks
    },
    setToken (state) {
      state.token = localStorage.getItem('token') || null
    }
  },
  actions: {
    register: function (store, user) {
      console.log('----store----', user)
      // axios.post('http://localhost:3000/signup', {
      axios.post('https://fancy-todos-api.herokuapp.com/signup', {
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signin: function (store, user) {
      // axios.post('http://localhost:3000/signin', {
      axios.post('https://fancy-todos-api.herokuapp.com/signin', {
        username: user.username,
        password: user.password
      })
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            store.commit('setToken')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signout: function (store) {
      localStorage.clear()
      store.commit('setToken')
    },
    getTasks: function (store) {
      // axios.get('http://localhost:3000/tasks', {headers: {'token': store.getters.token}})
      axios.get('https://fancy-todos-api.herokuapp.com/tasks', {headers: {'token': store.getters.token}})
        .then((response) => {
          store.commit('setTasks', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    done: function (store, task) {
      // axios.put(`http://localhost:3000/tasks/${task._id}`, {done: !task.done}, {headers: {'token': store.getters.token}})
      axios.put(`https://fancy-todos-api.herokuapp.com/tasks/${task._id}`, {done: !task.done}, {headers: {'token': store.getters.token}})
        .then((response) => {
          store.dispatch('getTasks')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    destroy: function (store, task) {
      // axios.delete(`http://localhost:3000/tasks/${task._id}`, {headers: {'token': store.getters.token}})
      axios.delete(`https://fancy-todos-api.herokuapp.com/tasks/${task._id}`, {headers: {'token': store.getters.token}})
        .then((response) => {
          store.dispatch('getTasks')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    create: function (store, newTask) {
      // axios.post(`http://localhost:3000/tasks/`, {todo: newTask.todo, categories: newTask.categories}, {headers: {'token': store.getters.token}})
      axios.post(`https://fancy-todos-api.herokuapp.com/tasks/`, {todo: newTask.todo, categories: newTask.categories}, {headers: {'token': store.getters.token}})
        .then((response) => {
          store.dispatch('getTasks')
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    update: function (store, editTask) {
      // axios.put(`http://localhost:3000/tasks/${editTask._id}`, {todo: editTask.todo, categories: editTask.categories}, {headers: {'token': store.getters.token}})
      axios.put(`https://fancy-todos-api.herokuapp.com/tasks/${editTask._id}`, {todo: editTask.todo, categories: editTask.categories}, {headers: {'token': store.getters.token}})
        .then((response) => {
          store.dispatch('getTasks')
          console.log('-----------', response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
