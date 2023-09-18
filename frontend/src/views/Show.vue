<template>
    <div ref="document">
        <div class="card w-75 m-3 mx-auto">
            <div class="card-body">
                <h5 v-if="getCurrentPost!=undefined && getCurrentPost!=null" class="card-title fw-bold"> {{ getCurrentPost.title }} </h5>
                <p v-if="getCurrentPost!=undefined && getCurrentPost!=null" class="card-text" > {{ getCurrentPost.body }}  </p>
                <router-link to="/" class="btn btn-dark me-1" >Back</router-link>
                    <router-link v-if="userIsAdmin" :to="{ name: 'UpdatePost'}" class="btn btn-primary me-1" >Update</router-link>
                <button v-if="userIsAdmin" @click="removePost()" class="btn btn-danger" >Delete</button>
                <button v-if="userIsAdmin" @click="createPDF" class="btn btn-warning me-1">PDF</button>
            </div>
        </div>
    
        <br />
        <h3>Comments</h3>
        <p>Total comments: {{ getTotalComments }}</p>
        <div v-for="comment in allComments" :key="comment.id" class="card w-75 mb-3 mx-auto bg-light">
            <div class="card-body">         
                <p class="card-text"> {{ comment.body }} </p>
                <span v-if="userIsAdmin" @click="removeComment(comment.id)" class="btn btn-danger" >Delete</span>
            </div>
        </div>
        <br />
        <div v-if="isLoggedIn">
        <h4 class="fw-bold ">Add comment</h4>
            <form @submit.prevent="onSubmit" class="w-75 mb-3 mx-auto">
                <div class="field mb-3">
                    <textarea type="text" v-model="comment" placeholder="Conmment..." class="form-control"/>
                </div>
        
                <div class="actions">
                    <input type="submit" value="Submit" class="btn btn-secondary"/>
                </div>
            </form>    
        </div>
        <div v-else>
            <h4>If you want add comment. Sign In!</h4>
        </div>
      <vue-awesome-paginate
        v-model="currentPage"
        @click="changeComments"
        :items-per-page="7"
        :max-pages-shown="5"
        :total-items="getTotalComments"
      />
    </div>
    </template>
    
    <script>
    import {mapGetters, mapActions} from 'vuex';
    import html2pdf from 'html2pdf.js'
    export default {
        name: 'Show',
        props: ['id'],
        data() {
            return {
                currentPage:1,
                // post: "",
                comment: ""
            }
        },
        methods: {
            ...mapActions(['fetchPost', 'deletePost', 'fetchComments', 'addComment', 'deleteComment','clickPaginateComment']),
            removePost() {
                const post = {
                    id: this.id,
                }
                this.deletePost(post);
            },
            removeComment(commentId){
                const comment = {
                    postId: this.id,
                    commentId: commentId
                }
                this.deleteComment(comment)
            },
            onSubmit(){
                const comment = {
                    body: this.comment,
                    id: this.id,
                    
                }
                this.addComment(comment)
                this.comment=''
            },
            createPDF(){
                html2pdf(this.$refs.document,{
                    margin: 1,
                    filename: 'posts.pdf',
                    html2canvas: { dpi: 190, letterRendering: true, useCORS: true},
                    jsPDF: { unit: 'in', format:'letter',orientation:'landscape'}
                })
            },
            changeComments(page){
                this.clickPaginateComment(page)
                this.fetchComments({id:this.id,page:page})
            }
        },
        computed: {
            ...mapGetters(['getCurrentPost','allPosts','allComments','isLoggedIn','userIsAdmin','getUserID','getTotalComments']),
            getCurrentPage(){
              return this.currentPage
            }
        },
        created() {
            this.fetchPost(this.id);
            // this.fetchTotalComments(this.id)
            this.fetchComments({id:this.id,page:this.currentPage})
        },
    }
    </script>
    
    