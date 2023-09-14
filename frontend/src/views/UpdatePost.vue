<template>
    <div class="container w-75 mb-3 mx-auto">
      <h2>Edit Post</h2>
          <form @submit.prevent="onSubmit">
          <div class="field mb-3">
              <input type="text" v-model="post.title" class="form-control"/>
          </div>
  
          <div class="field mb-3">
              <textarea type="text" v-model="post.body" class="form-control"/>
          </div>
  
          <div class="actions">
              <input type="submit" value="Submit" class="btn btn-secondary"/>
          </div>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name:"UpdatePost",
    props:['id'],
    data(){
          return{
              post:""
          }
      },
      methods:{
          ...mapActions(['updatePost','fetchPosts']),
          onSubmit(){
              const post = {
                  id: this.id,
                  title: this.post.title,
                  body: this.post.body
              }
              this.updatePost(post)
              this.$router.push('/')
          }
      },
      created() {
            this.fetchPosts();
        },
        computed: {
            ...mapGetters(['allPosts']),
        },
        mounted() {
            this.post = this.allPosts.find(post => post.id == this.id)
        }
  }
  </script>
  
  <style>
  
  </style>