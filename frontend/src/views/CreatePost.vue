<template>
    <div class="container w-75 mb-3 mx-auto">
      <h2>Create Post</h2>
      <form @submit.prevent="onSubmit">
          <div class="field mb-3">
              <input type="text" v-model="title" placeholder="Add Title..." class="form-control"/>
          </div>
  
          <div class="field mb-3">
              <textarea type="text" v-model="body" placeholder="Content..." class="form-control"/>
          </div>
          <div class="actions">
              <input type="submit" value="Add" class="btn btn-secondary mt-3"/>
          </div>
      </form>
    </div>
  </template>
  
  <script>
  import router from '@/router';
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
      name: "CreatePost",
      data() {
          return {
              title: "",
              body: "",
          }
      },
      computed:{
        ...mapGetters(['userIsAdmin','getUserID'])
      },    
      methods: {
          ...mapActions(['addPost']),
          onSubmit() {
              const formData = new FormData()
              formData.append('post[title]', this.title)
              formData.append('post[body]', this.body)
              formData.append('post[user_id]',this.getUserID)
              this.addPost(formData)
      
              this.title = "";
              this.body = "";
          }
      },
      created(){
        if(this.userIsAdmin == 'false' || !this.userIsAdmin){
            router.push("/signin")
        }
      }
  }
  </script>
  
  <style>
  
  </style>