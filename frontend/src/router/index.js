import { createRouter, createWebHashHistory } from 'vue-router'
import Posts from '../views/Posts'
import Show from '../views/Show'
import CreatePost from '../views/CreatePost'
import UpdatePost from '../views/UpdatePost'
const routes = [
  {
    path: '/',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/:id',
    name: 'Show',
    component: Show,
    props: true
  },
  {
    path:'/posts/update/:id',
    name: 'UpdatePost',
    component: UpdatePost,
    props: true
  },
  {
    path: '/posts/new',
    name: 'CreatePost',
    component: CreatePost
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router