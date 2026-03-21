export interface ProjectItem {
  slug: string
  category: string
  title: string
  subtitle: string
  description: string
  image: string
  tags: string[]
  repoUrl?: string
  prototypeUrl?: string
  ctaLabel?: string
  ctaUrl?: string
  order: number
  body: string
}

/** Simple browser-safe YAML frontmatter parser */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const yamlBlock = match[1]
  const content = match[2]
  const data: Record<string, unknown> = {}
  const lines = yamlBlock.split(/\r?\n/)

  let i = 0
  while (i < lines.length) {
    const m = lines[i].match(/^(\w+):\s*(.*)$/)
    if (!m) { i++; continue }

    const key = m[1]
    let value: unknown = m[2]

    // Check if next lines are a YAML list (  - item)
    if (value === '' && i + 1 < lines.length && /^\s+-\s/.test(lines[i + 1])) {
      const arr: string[] = []
      i++
      while (i < lines.length && /^\s+-\s/.test(lines[i])) {
        arr.push(lines[i].replace(/^\s+-\s+/, '').trim())
        i++
      }
      data[key] = arr
      continue
    }

    // Parse inline arrays like [a, b, c]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s) => s.trim())
    }
    // Parse numbers
    else if (typeof value === 'string' && /^\d+$/.test(value)) {
      value = Number(value)
    }

    data[key] = value
    i++
  }

  return { data, content }
}

const projectFiles = import.meta.glob('/content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function loadProjects(): ProjectItem[] {
  const projects: ProjectItem[] = []

  for (const path in projectFiles) {
    const raw = projectFiles[path] as string
    const { data, content } = parseFrontmatter(raw)

    projects.push({
      slug: data.slug as string,
      category: data.category as string,
      title: data.title as string,
      subtitle: data.subtitle as string,
      description: data.description as string,
      image: data.image as string,
      tags: (data.tags as string[]) ?? [],
      repoUrl: data.repoUrl as string | undefined,
      prototypeUrl: data.prototypeUrl as string | undefined,
      ctaLabel: data.ctaLabel as string | undefined,
      ctaUrl: (data.ctaUrl || data.prototypeUrl || data.repoUrl) as string | undefined,
      order: (data.order as number) ?? 999,
      body: content,
    })
  }

  return projects.sort((a, b) => a.order - b.order)
}

export const projects = loadProjects()
