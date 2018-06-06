<template lang="pug">
  div
    .loader(v-show='isLoading')
      font-awesome-icon(icon='sun' size='7x' spin)
    article#the-article(v-show='!isLoading')
      aside#the-article__menu(v-show='showMenu')
        nuxt-link(to='/')
          img(src='/img/logo.svg')
        div(v-show='article.headings && article.headings.length')
          div Contents
          ul
            li(v-for='heading in article.headings')
              a(:href='"#" + heading.id') {{ heading.title }}
              ul
                li(v-for='heading in heading.children')
                  a(:href='"#" + heading.id') {{ heading.title }}
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
  import WikipediaArticle from '~/assets/js/WikipediaArticle'

  const HOME_TITLE = 'Wikipedia, the free encyclopedia'
  const HOME_ARTICLE = new WikipediaArticle(
    'Welcome to Wikipedia!',
    '<p>Welcome to Wikipedia!</p>',
  )
  const ERROR_ARTICLE = new WikipediaArticle(
    '404 Article Not Found',
    '<p>Please try searching for something else.</p>',
  )

  export default {
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
      flex: 1 180px
    &__content-outer
      flex: 5 620px
      position: relative
      border: $border
      border-top: 0
      transition: box-shadow .2s ease-out
      overflow-x: auto
      outline-offset: -3px
      &:hover
        box-shadow: 0 0 50px -20px
    &__content-inner
      max-width: 800px
      padding: $p-lg
      margin: 0 auto
    &__infobox
      flex: 1 240px
      outline-offset: -3px
</style>
