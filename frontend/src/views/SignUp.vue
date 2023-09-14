<template>
    <div class="container w-25 p-3 mx-auto">
      <h2>Sign Up</h2>
      <form @submit="onSignUp">
          <div class="mb-3">
              <input type="email" v-model="email" class="form-control" placeholder="Email">
          </div>
          <div class="mb-3">
              <input type="password" v-model="password" class="form-control" placeholder="Password">
          </div>
          <div class="mb-3">
              <input type="password" v-model="password_confirmation" class="form-control" placeholder="Password Confirmation">
          </div>
          <input value="Sign Up" type="submit" class="btn btn-primary"/>
      </form>
    </div>
  </template>
  
<script>
    import "@/store/index.js";
    import { mapActions, mapGetters } from "vuex";
    import router from '@/router';
  export default {
      data(){
          return{
              email:"",
              password:"",
              password_confirmation:""
          }
      },
      methods:{
          ...mapActions(["registerUser"]),
          onSignUp(){
              const authData = {
                  user:{
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                  }
              }
              this.registerUser(authData)
              this.email = ''
              this.password = ''
              this.password_confirmation = ''
              router.push("/signin")
          }
      }
  }
  </script>
  
  <style>
  
  </style>