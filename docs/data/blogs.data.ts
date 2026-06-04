import { createContentLoader, ContentData } from 'vitepress'

declare const data: ContentData[]
export { data }

export default createContentLoader('/blogs/**/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .filter(p => !p.url.endsWith('/blogs/'))
      .sort((a, b) => {
        const dateA = parseDate(a.frontmatter.publish_date || a.frontmatter.date || '')
        const dateB = parseDate(b.frontmatter.publish_date || b.frontmatter.date || '')
        return dateB - dateA
      })
  },
})

function parseDate(value: string): number {
  if (!value) return 0
  const d = new Date(value)
  return isNaN(d.getTime()) ? 0 : d.getTime()
}
