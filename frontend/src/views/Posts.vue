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
      <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"><button @click="prevPage" class="page-link">Previous</button></li>
            <li class="page-item"><button @click="nextPage" class="page-link">Next</button></li>
        </ul>
        </nav>
    </div>
    </template>
    
    <script>
    import {mapGetters, mapActions} from 'vuex';
    import Pagination from '../components/Pagination.vue';
    export default {
        name: 'Posts',
        components:{
            Pagination
        },
        data(){
            return{
                page:1
            }
        },
        methods: {
            ...mapActions(['fetchPosts']),
            nextPage(){
                console.log(this.page)
                return this.page++
            },
            prevPage(){
                if(this.page > 1){
                    this.page--
                }else{
                    this.page = 1
                }
                return this.page
            }
        },
        computed: {
            ...mapGetters(['allPosts']),
            // getPage(){
            //     return this.page
            // }
        },
        created() {
            this.fetchPosts(this.page);
        }
    }
    </script>
    
    
    <style>
    
    </style>