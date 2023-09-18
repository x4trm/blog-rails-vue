<template>
    <div>
      <h1>Posts</h1>
      <span v-if="!userIsAdmin">
      <div v-for="post in allPosts" :key="post.id" class="card w-75 mb-3 mx-auto delayed-div">
        <div class="card-body">
            <h4 class="card-title">{{post.title}}</h4>
            <p class="card-text">{{post.body}}</p>
            <router-link class="btn btn-primary" :to="{name:'Show',params:{id:post.id}}">Read More</router-link>
        </div>
      </div>
        <div class="pag">
        <p>Total posts: {{ getTotalPosts }}</p>
        <vue-awesome-paginate
          v-model="currentPage"
          @click="onClickHandler"
          :items-per-page="2"
          :max-pages-shown="5"
          :total-items="getTotalPosts"
        />
        </div>
      </span>
      <span v-else>      
        <div v-for="post in allPosts" :key="post.id" class="card w-75 mb-3 mx-auto delayed-div">
        <div class="card-body">
            <h4 class="card-title">{{post.title}}</h4>
            <router-link class="btn btn-primary" :to="{name:'Show',params:{id:post.id}}">Read More</router-link>
        </div>
      </div>
        <p>Total posts: {{ getTotalPosts }}</p>
        <vue-awesome-paginate
          v-model="currentPage"
          @click="onClickHandler"
          :items-per-page="10"
          :max-pages-shown="5"
          :total-items="getTotalPosts"
        />
      </span>
    </div>
    </template>
    
    <script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'Posts',
        data(){
          return{
            currentPage:1
          }
        },
        methods: {
            ...mapActions(['fetchAdminPosts','fetchTotalPosts','fetchPosts','clickPaginatePosts']),
            onClickHandler(page){
                this.clickPaginatePosts(page)
                // console.log("Methods  ", this.userIsAdmin)
                this.fetchPosts({page:this.getCurrentPage,isAdmin:this.userIsAdmin})
            }
        },
        computed: {
            ...mapGetters(['allPosts','getTotalPosts','userIsAdmin']),
            getCurrentPage(){
              return this.currentPage
            },
        },
        watch:{
          userIsAdmin(newVal){
              this.fetchTotalPosts()
              this.fetchPosts({page:this.getCurrentPage,isAdmin:this.userIsAdmin});
            
          }
        },
        created() {
            this.fetchTotalPosts()
            this.fetchPosts({page:this.getCurrentPage,isAdmin:this.userIsAdmin});
            
        }
    }
    </script>
<style>
.pag{
  position: absolute;
  bottom: 20px;
  width: 100%;
}
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #0d6efd;
    border: 1px solid #0d6efd;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }
  .delayed-div{
    animation: 1s ease-out 0s 1 slideInLeft;
  }
  @keyframes slideInLeft {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>