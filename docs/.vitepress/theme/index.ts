import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import PostHeader from './PostHeader.vue'
import './style.css'
import './utils/cookie-banner.js'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(PostHeader),
    })
  },
} satisfies Theme
