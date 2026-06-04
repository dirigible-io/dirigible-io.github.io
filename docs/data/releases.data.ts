import { createContentLoader, ContentData } from 'vitepress'

declare const data: ContentData[]
export { data }

export default createContentLoader('/releases/**/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .filter(p => !p.url.endsWith('/releases/'))
      .sort((a, b) => dateOf(b) - dateOf(a))
  },
})

function dateOf(p: ContentData): number {
  const fm = parseDate(p.frontmatter.publish_date || p.frontmatter.date || '')
  if (fm) return fm
  const m = p.url.match(/\/releases\/(\d{4})\/(\d{2})\/(\d{2})\//)
  if (m) return Date.UTC(+m[1], +m[2] - 1, +m[3])
  return 0
}

function parseDate(value: string): number {
  if (!value) return 0
  const d = new Date(value)
  return isNaN(d.getTime()) ? 0 : d.getTime()
}
