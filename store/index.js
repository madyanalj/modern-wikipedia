import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    article: {},
    isEditing: false,
  },
  mutations: {
    setArticle: (state, article) => state.article = article,
    setEditingMode: (state) => state.isEditing = true,
    setReadingMode: (state) => state.isEditing = false,
  },
})
