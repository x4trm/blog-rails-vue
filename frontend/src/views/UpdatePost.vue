<template>
    <div class="container w-75 mb-3 mx-auto">
      <h2>Edit Post</h2>
          <form @submit.prevent="onSubmit">
          <div class="field mb-3">
              <input type="text" v-model="title" class="form-control"/>
          </div>
  
          <div class="field mb-3">
              <input type="text" v-model="body" class="form-control"/>
          </div>
  
          <div class="actions">
              <input type="submit" value="Submit" class="btn btn-secondary"/>
          </div>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import router from "@/router"
  
  export default {
      name:"UpdatePost",
      props:['id','title2','body2'],
      data(){
          return{
              title: this.title2,
              body: this.body2
          }
      },
      methods:{
          ...mapActions(['updatePost']),
          onSubmit(){
              const post = {
                  id: this.id,
                  title: this.title,
                  body: this.body
              }
              this.updatePost(post)
              this.$router.push('/')
          }
      }
  }
  </script>
  
  <style>
  
  </style>