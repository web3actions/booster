<template>
  <Header />
  <Search />
  <Main />
  <Footer />
</template>

<script setup>
import { useStore } from 'vuex'
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'

const store = useStore()
const accessToken = localStorage.getItem('accessToken')
if (accessToken) {
  store.commit('setAccessToken', accessToken)
  store.dispatch('loadUser')
}

const urlParams = new URLSearchParams(window.location.search)
const code = urlParams.get('code')
if (code) {
  window.history.replaceState({}, document.title, window.location.origin)
  fetch('https://mktcode.uber.space/github-oauth?app=ethbooster&code=' + code)
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token)
        store.commit('setAccessToken', data.access_token)
        store.dispatch('loadUser')
      }
    })
}
</script>
