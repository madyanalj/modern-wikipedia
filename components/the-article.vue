<template lang="pug">
  div
    .loader(v-show='isLoading')
      font-awesome-icon(icon='sun' size='7x' spin)
    article#the-article(v-show='!isLoading')
      aside#the-article__menu(v-show='showMenu')
        the-article-menu
      section#the-article__content-outer(
        ref='theArticle__ContentOuter'
        :contenteditable='isEditing'
      )
          #the-article__content-inner
            h1 {{ article.title }}
            div(v-html='article.content')
      aside#the-article__infobox(v-show='article.infobox' v-html='article.infobox' :contenteditable='isEditing')
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import TheArticleMenu from '~/components/the-article-menu.vue'
  import WikipediaArticle from '~/assets/js/WikipediaArticle'
  import suggestedArticles from '~/assets/json/suggested-articles'

  function generateHomeContent(list) {
    const introduction = '<p>Use the search box at the top left corner or click one of the links below to read Wikipedia articles wrapped in this modern, responsive design.</p>'
    const formatHref = (article) => article.replace(/\s/g, '_')
    const formatArticle =
      (article) => `<li><a href='${formatHref(article)}'>${article}</a></li>`
    const formatArticles =
      (articles) => `<ul>${articles.map(formatArticle).join('')}</ul>`
    const formatCategory =
      (item) => `<h2>${item.category}</h2>${formatArticles(item.articles)}`
    const formatList = (list) => list.map(formatCategory).join('')
    return introduction + formatList(list)
  }

  const HOME_TITLE = 'Wikipedia, the free encyclopedia'
  const HOME_ARTICLE = new WikipediaArticle(
    'Welcome to Modern Wiki!',
    generateHomeContent(suggestedArticles),
  )
  const ERROR_ARTICLE = new WikipediaArticle(
    '404 Article Not Found :(',
    '<p>Try searching for something else.</p>',
  )

  export default {
    components: {
      TheArticleMenu,
    },
    computed: {
      ...mapState(['article', 'showMenu', 'isEditing']),
      routeArticleTitle: (vm) => vm.$route.params.articleTitle,
      foundArticleTitle: (vm) => vm.article ? vm.article.title : '',
      isHome: (vm) => vm.routeArticleTitle == null,
      defaultPageTitle: (vm) => `${vm.foundArticleTitle} - Wikipedia`,
      pageTitle: (vm) => !vm || vm.isHome ? HOME_TITLE : vm.defaultPageTitle,
      isLoading: (vm) => !vm || vm.$nuxt.$loading.show,
    },
    head() {
      return { title: this.pageTitle }
    },
    watch: {
      isEditing(val) {
        if (!val) return
        this.$nextTick(this.focusOnArticleEditor)
      },
    },
    beforeMount() {
      this.$nextTick(this.init)
    },
    methods: {
      ...mapMutations(['setArticle', 'setReadingMode']),
      async init() {
        this.$nuxt.$loading.start()
        this.setReadingMode()
        this.setArticle(await this.fetchArticle())
        this.$nuxt.$loading.finish()
      },
      async fetchArticle() {
        if (this.isHome) return HOME_ARTICLE
        const article = new WikipediaArticle(this.routeArticleTitle)
        return await article.fetch().catch(() => ERROR_ARTICLE)
      },
      focusOnArticleEditor() {
        this.$refs.theArticle__ContentOuter.focus()
      },
    },
  }
</script>

<style lang="sass" scoped>
  @import ~assets/sass/variables

  .loader
    color: $c-grey
    padding: 5em 1em 1em
    text-align: center

  #the-article
    display: flex
    flex-wrap: wrap
    &__menu
      flex: 1 12em
    &__content-outer
      flex: 5 30em
      position: relative
      border-left: $border
      border-right: $border
      transition: box-shadow .2s ease-out
      overflow-x: auto
      outline-offset: -3px
      &:hover
        box-shadow: 0 0 50px -20px
    &__content-inner
      max-width: 50em
      padding: $p-lg
      margin: 0 auto
      @media screen and (max-width: 1220px)
        padding: $p-sm
      /deep/ ul
        list-style-type: disc
        padding-left: 2.5em
        margin: 1em 0
    &__infobox
      flex: 1 12em
      outline-offset: -3px
</style>
