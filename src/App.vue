<template>
  <div id="app">
    <img src="./assets/images/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <button @click="testApi" class="test-api">Test API</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    testApi() {
      const catchHelper = (error) => console.error(error);

      const thenHelper = (response) => {
        if (response) {
          console.log(response.body);
        }
      }

      this.$http.get('/api/notes').catch(catchHelper).then(thenHelper);
      this.$http.post('/api/notes').catch(catchHelper).then(thenHelper);
      this.$http.put('/api/notes/1055').catch(catchHelper).then(thenHelper);
      this.$http.delete('/api/notes/1055').catch(catchHelper).then(thenHelper);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.test-api {
  display: block;
  margin: 2em auto 0;
  padding: 1em 2em;
  border-style: none;
  background-color: #1cb061;
  color: #d3f8e4;
  font-size: 1em;
  cursor: pointer;
}
</style>
