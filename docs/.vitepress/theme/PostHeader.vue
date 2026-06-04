<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

const isPostPage = computed(() => {
  const path = page.value.relativePath || ''
  if (!/^(blogs|releases)\//.test(path)) return false
  if (/(^|\/)index\.md$/.test(path)) return false
  return true
})

const showHeader = computed(() => isPostPage.value && !!frontmatter.value.title)
</script>

<template>
  <header v-if="showHeader" class="post-header">
    <h1 class="post-header-title">{{ frontmatter.title }}</h1>
    <p v-if="frontmatter.author || frontmatter.publish_date || frontmatter.read_time" class="post-header-meta">
      <img
        v-if="frontmatter.author_avatar"
        :src="frontmatter.author_avatar"
        :alt="frontmatter.author || 'Author'"
        class="author-image"
      />
      <span v-if="frontmatter.author" class="post-author">{{ frontmatter.author }}</span>
      <span v-if="frontmatter.publish_date" class="post-date">· {{ frontmatter.publish_date }}</span>
      <span v-if="frontmatter.read_time" class="post-read-time">· {{ frontmatter.read_time }} read</span>
    </p>
  </header>
</template>

<style scoped>
.post-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.post-header-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-1);
}
.post-header-meta {
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
.post-header-meta .author-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
}
.post-header-meta .post-author {
  font-weight: 500;
  color: var(--vp-c-text-1);
}
</style>
