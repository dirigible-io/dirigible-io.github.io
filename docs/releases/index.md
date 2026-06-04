---
layout: home

hero:
  name: Releases
  text: Eclipse Dirigible Releases
  tagline: Release notes and changelogs for every version

editLink: false
---

<script setup>
import { withBase } from 'vitepress'
import { computed } from 'vue'
import { data as releases } from '../data/releases.data'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function displayDate(r) {
  if (r.frontmatter.publish_date) return r.frontmatter.publish_date
  const m = r.url.match(/\/releases\/(\d{4})\/(\d{2})\/(\d{2})\//)
  if (!m) return ''
  return `${MONTHS[+m[2] - 1]} ${+m[3]}, ${m[1]}`
}

function yearOf(r) {
  if (r.frontmatter.publish_date) {
    const d = new Date(r.frontmatter.publish_date)
    if (!isNaN(d.getTime())) return d.getUTCFullYear()
  }
  const m = r.url.match(/\/releases\/(\d{4})\//)
  return m ? +m[1] : 0
}

const grouped = computed(() => {
  const groups = []
  let current = null
  for (const r of releases) {
    const y = yearOf(r)
    if (!current || current.year !== y) {
      current = { year: y, items: [] }
      groups.push(current)
    }
    current.items.push(r)
  }
  return groups
})
</script>

<section class="releases-list">
  <div v-for="group of grouped" :key="group.year" class="releases-year">
    <h3 class="releases-year-title">{{ group.year }}</h3>
    <ul class="releases-items">
      <li v-for="r of group.items" :key="r.url">
        <span class="releases-date">{{ displayDate(r) }}</span>
        <a class="releases-link" :href="withBase(r.url)">{{ r.frontmatter.title }}</a>
      </li>
    </ul>
  </div>
</section>

<style scoped>
.releases-list {
  padding: 1rem 0 2rem;
  max-width: 900px;
  margin: 0 auto;
}
.releases-year {
  margin: 1.5rem 0;
}
.releases-year-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  letter-spacing: 0.02em;
}
.releases-items {
  list-style: none;
  margin: 0;
  padding: 0;
}
.releases-items li {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1rem;
  padding: 0.35rem 0;
  font-size: 0.95rem;
  align-items: baseline;
}
.releases-items li + li {
  border-top: 1px dashed var(--vp-c-divider);
}
.releases-date {
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.releases-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}
.releases-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
@media (max-width: 640px) {
  .releases-items li {
    grid-template-columns: 6rem 1fr;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
