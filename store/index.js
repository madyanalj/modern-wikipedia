import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    article: {},
    showMenu: true,
    isEditing: false,
  },
  mutations: {
    setArticle: (state, article) => state.article = article,
    toggleShowMenu: (state) => state.showMenu = !state.showMenu,
    setEditingMode: (state) => state.isEditing = true,
    setReadingMode: (state) => state.isEditing = false,
  },
})
