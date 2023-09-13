<template>
    <div class="container w-25 p-3 mx-auto">
      <h2>Sign In</h2>
      <form @submit="onLogin" class="login-form">
          <div class="mb-3">
              <input type="email" v-model="email" class="form-control" placeholder="Email">
          </div>
          <div class="mb-3">
              <input type="password" v-model="password" class="form-control" placeholder="Password">
          </div>
          <input type="submit" class="btn btn-primary" value="Sign In"/>
      </form>
    </div>
  </template>

<script>
import { mapActions,mapGetters } from 'vuex';
import "@/store/index.js"

export default {
    computed: {
        ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
    },
    data(){
        return{
            email:"",
            password:""
        }
    },
    methods:{
        ...mapActions(['loginUser']),
        onLogin(event){
            event.preventDefault();
            const authData = {
                user:{
                    email: this.email,
                    password: this.password,
                }
            }
            this.loginUser(authData)
            this.email = ''
            this.password = ''
        }
    },
    // mounted(){
    //     this.$store.dispatch('reload')
    // }
}
</script>

<style>

</style>