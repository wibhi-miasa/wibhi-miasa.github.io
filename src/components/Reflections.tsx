import { Users, TrendingUp, Lock, AlertCircle } from 'lucide-react'

const reflections = [
  {
    icon: Users,
    title: 'Digital Divide',
    description: 'AR navigation inherently favours tech-comfortable users. Older or less tech-familiar visitors may find the interface alienating. A truly inclusive solution would require a low-tech fallback.',
  },
  {
    icon: TrendingUp,
    title: 'The Matthew Effect',
    description: 'A personalised recommender risks amplifying the visibility of already-popular stalls, leaving smaller vendors further undiscovered.',
  },
  {
    icon: Lock,
    title: 'Privacy',
    description: 'Collecting location data, dietary preferences, and browsing behaviour raises real data security concerns that warrant careful future design work.',
  },
  {
    icon: AlertCircle,
    title: 'Technical Limitations',
    description: 'AR requires a stable internet connection and a compatible device — constraints that limit accessibility in crowded market environments.',
  },
]

export default function Reflections() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {reflections.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.title} className="flex flex-col gap-2 p-4 rounded-xl border border-neutral-200 bg-neutral-50">
            <div className="w-8 h-8 rounded-lg border border-neutral-300 bg-white flex items-center justify-center text-neutral-600 shrink-0">
              <Icon size={15} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-neutral-800">{item.title}</p>
            <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}
