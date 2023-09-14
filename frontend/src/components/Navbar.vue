<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="container-fluid">
  <router-link to="/" class="navbar-brand">Blog</router-link>
  <ul v-if="!isLoggedIn" class="navbar-nav">
    <li><router-link class="nav-link active" to="/signup">Sign Up</router-link></li>
    <li><router-link class="nav-link active" to="/signin">Sign In</router-link></li>
  </ul>
   <ul v-else class="navbar-nav">
     <li v-if="userIsAdmin"><router-link class="nav-link active" to="/posts/new">New Post</router-link></li>
     <li><span class="nav-link active" @click="logoutUser">Logout</span></li>
   </ul>
</div>
</nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  methods:{
    ...mapActions(['logoutUser']),
    
  },
  computed:{
    ...mapGetters(['isLoggedIn','userIsAdmin'])
  },
  // created(){
  //   this.$store.dispatch('reload')
  // }
}
</script>
<style scoped>
ul{
  list-style: none;
}
a{
  text-decoration: none;
  color:#000;
}
li{
  list-style: none;
}
span{
text-decoration: none;
cursor: pointer;
color: #000;
}
</style>