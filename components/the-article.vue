<template lang="pug">
  article#the-article
    aside#the-article__menu
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
    data: () => ({
      pageTitle: HOME_TITLE,
    }),
    computed: mapState(['article', 'isEditing']),
    head() {
      return {
        title: this.pageTitle,
      }
    },
    watch: {
      isEditing(val) {
        if (!val) return
        this.$nextTick(this.focusOnArticleEditor)
      },
    },
    created() {
      if (process.server) return
      this.setReadingMode()
      this.setArticleAndPageTitle(this.$route.params.articleTitle)
    },
    methods: {
      ...mapMutations(['setArticle', 'setReadingMode']),
      async setArticleAndPageTitle(articleTitle) {
        let pageTitle = HOME_TITLE
        let wikipediaArticle = HOME_ARTICLE
        if (articleTitle) {
          wikipediaArticle = new WikipediaArticle(articleTitle)
          await wikipediaArticle.fetch().catch(() => {
            wikipediaArticle = ERROR_ARTICLE
          })
          pageTitle = `${wikipediaArticle.title} - Wikipedia`
        }
        this.pageTitle = pageTitle
        this.setArticle(wikipediaArticle)
      },
      focusOnArticleEditor() {
        this.$refs.theArticle__ContentOuter.focus()
      },
    },
  }
</script>

<style lang="sass" scoped>
  @import ~assets/sass/variables

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
