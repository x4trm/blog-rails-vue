<template>
    <div ref="document">
        <div class="card w-75 m-3 mx-auto">
            <div class="card-body">
                <h5 class="card-title fw-bold" v-if="allPosts != undefined && allPosts.length != 0"> {{ post.title }} </h5>
                <p class="card-text" v-if="allPosts != undefined && allPosts.length != 0"> {{ post.body }}  </p>
                <router-link to="/" class="btn btn-dark me-1" >Back</router-link>
                <!-- <router-link :to="{ name: 'UpdatePost'
                        , params: { 
                        id: id,
                        title2: post.title,
                        body2: post.body  
                        }
                    }" class="btn btn-primary me-1" >Update</router-link> -->
                    <router-link v-if="userIsAdmin" :to="{ name: 'UpdatePost'}" class="btn btn-primary me-1" >Update</router-link>
                <button v-if="userIsAdmin" @click="removePost()" class="btn btn-danger" >Delete</button>
                <button v-if="userIsAdmin" @click="createPDF" class="btn btn-warning me-1">PDF</button>
            </div>
        </div>
    
        <br />
        <h3>Comments</h3>
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
                post: "",
                comment: ""
            }
        },
        methods: {
            ...mapActions(['fetchPosts', 'deletePost', 'fetchComments', 'addComment', 'deleteComment']),
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
            }
        },
        computed: {
            ...mapGetters(['allPosts','allComments','isLoggedIn','userIsAdmin','getUserID']),
        },
        created() {
            this.fetchPosts();
            this.fetchComments(this.id)
        },
        mounted() {
            this.post = this.allPosts.find(post => post.id == this.id)
        }
    }
    </script>
    
    
    <style>
    
    </style>