<template>
    <div>
      <h1>Posts</h1>
      <div v-for="post in allPosts" :key="post.id" class="card w-75 mb-3 mx-auto">
        <div class="card-body">
            <h4 class="card-title">{{post.title}}</h4>
            <p class="card-text">{{post.body}}</p>
            <router-link class="btn btn-primary" :to="{name:'Show',params:{id:post.id}}">Read More</router-link>
        </div>
      </div>
    </div>
    </template>
    
    <script>
    import {mapGetters, mapActions} from 'vuex';
    
    export default {
        name: 'Posts',
        methods: {
            ...mapActions(['fetchPosts']),
        },
        computed: {
            ...mapGetters(['allPosts'])
        },
        created() {
            this.fetchPosts();
        }
    }
    </script>
    
    
    <style>
    
    </style>