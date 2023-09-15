import router from '@/router'
import axios from 'axios'

const API_URL = 'http://0.0.0.0:3000/posts/'

const state = {
    posts:[],
    comments:[],
    postErrors:[],
    postSuccess:[],
    totalPosts:0,
    currentPage:1,
    totalComments:0,
    currentComment:1,
    currentPost:null
}
const getters = {
    allPosts: (state) => state.posts,
    allComments: (state) => state.comments,
    allPostErrors: (state) => state.postErrors,
    allPostSuccess: (state) => state.postSuccess,
    getTotalPosts: (state) => state.totalPosts,
    getCurrentPage: (state) => state.currentPage,
    getTotalComments: (state) => state.totalComments,
    getCurrentComment: (state) => state.currentComment,
    getCurrentPost: (state) => state.currentPost
}

const actions = {
    async fetchPost({commit},id){
        const response = await axios.get(API_URL+id)
        commit('setCurrentPost',response.data)
    },
    async fetchPosts({commit},page){
        const response = await axios.get(API_URL+`?page=${page ? page : 1 }`)
        commit('setPosts',response.data['posts'])
    },
    async fetchTotalPosts({commit}){
        const response = await axios.get(API_URL)
        commit('setTotalPosts',response.data['total_posts'])
    },
    async fetchComments({commit},{id,page}){
        const response = await axios.get(API_URL+`${id}/comments/`+`?page=${page ? page : 1}`)
        commit('setComments',response.data['comments'])
        commit('setTotalComments',response.data['total_comments'])
    },
    addPost({commit}, post){
        axios.post(API_URL, post,{withCredentials:true})
        .then((response)=>{
            commit('newPost',response.data)
            commit('setSuccessPost',"Post successfully created")
            router.push("/")
        })
    },
    clickPaginatePosts({commit},page){
        commit('setCurrentPage',page)
    },
    clickPaginateComment({commit},page){
        commit('setCurrentComment',page)
    },
    addComment({ commit }, post) {
        axios.post(API_URL + `${post.id}/comments`,{
                comment: {
                    body: post.body
                }
            }, { withCredentials: true })
        .then((response) => {
            commit('newComment', response.data);
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 422) {
                    commit('setErrorPost', error.response.data.errors);
                } else if (error.response.status === 401) {
                    // router.push("/sign_in");
                    commit('setErrorPost', error.response.data.errors);
                }
            } else {
                console.error("Wystąpił nieznany błąd:", error);
            }
        });
    },
    deleteComment({ commit }, post) {
        axios.delete(API_URL + `/${post.postId}/comments/${post.commentId}`, { withCredentials: true })
        .then(() => {
            commit('deleteComment', post.commentId);
        })
        .catch((error) => {
            if(error.response.status == 422)
                commit('setErrorPost', error.response.data.errors)
            else if(error.response.status == 401)
                router.push("/sign_in")
        });
    },
    deletePost({commit},post){
        axios.delete(API_URL+`${post.id}`,{withCredentials: true})
        .then(()=>{
            commit('removePost',post.id)
            commit('setSuccessPost',"Post successfully deleted")
            router.push("/")
        })
    },
    updatePost({ commit }, post) {
        axios.put(API_URL + `${post.id}`,{
            post: {
                title: post.title,
                body: post.body
            }
        }, { withCredentials: true })
        .then((response) => {     
            commit('setUpdatedPost', response.data);
            commit('setSuccessPost', "Post successfully updated");
            router.push("/posts/" + `${post.id}`)
        })
        .catch((error) => {
            if(error.response.status == 422)
                commit('setErrorPost', error.response.data.errors)
            else if(error.response.status == 401)
                router.push("/")
        });
    }
}
const mutations = {
    setPosts: (state,posts) => (state.posts = posts),
    setComments: (state,comments) => (state.comments = comments),
    newPost: (state, post) => (state.posts.unshift(post)),
    newComment: (state,comment) => (state.comments.push(comment)),
    removePost: (state, id) => 
        (state.posts = state.posts.filter(post => post.id != id)),
    deleteComment: (state, id) => 
        (state.comments = state.comments.filter(comment => comment.id != id)),
    setErrorPost: (state, error) => (state.postErrors.push(error)),
    setSuccessPost: (state, msg) => (state.postSuccess.push(msg)),
    setUpdatedPost: (state, updatedPost) => {
        const index = state.posts.findIndex(post => post.id === updatedPost.id);
        if(index !== -1)
            state.posts.splice(index, 1, updatedPost);
    },
    setTotalPosts: (state,totalPosts) => (state.totalPosts = totalPosts),
    setCurrentPage: (state,currentPage) => (state.currentPage = currentPage),
    setTotalComments: (state,totalComments) => (state.totalComments = totalComments),
    setCurrentComment: (state,currentComment) => (state.currentComment = currentComment),
    setCurrentPost: (state,currentPost) => (state.currentPost = currentPost)
}
export default {
    state,
    getters,
    actions,
    mutations
}