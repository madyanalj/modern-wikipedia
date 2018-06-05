import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    article: {},
  },
  mutations: {
    setArticle(state, article) {
      state.article = article
    },
  },
})
