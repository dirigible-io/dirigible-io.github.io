---
layout: home

hero:
  name: Blog
  text: Eclipse Dirigible Stories
  tagline: Tutorials, deep dives, and announcements from the Eclipse Dirigible community

editLink: false
---

<script setup>
import { withBase } from 'vitepress'
import { data as posts } from '../data/blogs.data'
</script>

<section class="blog-posts">
  <ul class="post-list">
    <li class="post-item" v-for="post of posts" :key="post.url">
      <p class="post-meta">
        <img
          v-if="post.frontmatter.author_avatar"
          :src="post.frontmatter.author_avatar"
          :alt="post.frontmatter.author || 'Author'"
          class="author-image"
        />
        <span class="post-author" v-if="post.frontmatter.author">{{ post.frontmatter.author }}</span>
        <span class="post-date" v-if="post.frontmatter.publish_date">· {{ post.frontmatter.publish_date }}</span>
        <span class="post-read-time" v-if="post.frontmatter.read_time">· {{ post.frontmatter.read_time }} read</span>
      </p>
      <h4 class="post-title"><a :href="withBase(post.url)">{{ post.frontmatter.title }}</a></h4>
      <p v-if="post.frontmatter.description">{{ post.frontmatter.description }}</p>
    </li>
  </ul>
</section>
