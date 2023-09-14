import { createStore } from 'vuex'
import posts from '@/store/modules/posts'
import auth from '@/store/modules/auth'
import pagination from '@/store/modules/pagination'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts,
    auth,
    pagination
  }
})