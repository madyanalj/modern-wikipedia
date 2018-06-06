import axios from 'axios'

const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/w/api.php'
const WIKIPEDIA_API_PARAMS = {
  action: 'parse',
  prop: 'text',
  format: 'json',
  disabletoc: '',
  disableeditsection: '',
  origin: '*',
}

export default class WikipediaArticle {
  constructor(title, content = null) {
    this.title = title
    this.content = content
  }

  get headings() {
    const headings = []
    const doc = new DOMParser().parseFromString(this.content, 'text/html')
    doc.querySelectorAll('h2, h3').forEach(e => {
      const heading = {
        title: e.innerText,
        children: [],
      }
      heading.id = heading.title.replace(/\s+/g, '_')
      if (e.nodeName === 'H2') {
        headings.push(heading)
      } else {
        const parent = headings[headings.length - 1]
        if (parent) parent.children.push(heading)
        else headings.push(heading)
      }
    })
    return headings
  }

  async fetch() {
    const { data } = await axios.get(WIKIPEDIA_API_URL, {
      params: {
        ...WIKIPEDIA_API_PARAMS,
        page: this.title,
      },
    })
    if (data.error) throw `Cannot find article ${this.title}`
    this.title = data.parse.title
    this._processHTML(data.parse.text['*'])
    return this
  }

  _processHTML(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const selectors = '.navbox, .ambox, .sistersitebox, .mw-empty-elt'
    const elementsToRemove = [...doc.querySelectorAll(selectors)]

    // route wiki links to app instead of wikipedia url
    doc.querySelectorAll('a[href^="/wiki"]').forEach(a => {
      const href = a.getAttribute('href')
      let correctHref = '#'
      if (href.indexOf('/wiki/File:') === -1) {
        correctHref = href.substr(5)
      }
      a.setAttribute('href', correctHref)
    })

    const infobox = doc.getElementsByClassName('infobox')[0]
    if (infobox) {
      elementsToRemove.push(infobox)
      // make infobox responsive
      infobox.removeAttribute('style')
      this.infobox = infobox.outerHTML
    }

    // strip out unneeded (meta) html elements
    elementsToRemove.forEach(e => e.parentElement.removeChild(e))
    this.content = doc.body.innerHTML
  }
}
