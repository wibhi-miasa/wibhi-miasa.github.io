import { UsersRound, Search, LayoutGrid } from 'lucide-react'

const steps = [
  {
    icon: UsersRound,
    title: 'Interviews',
    details: ['8 participants', 'Semi-structured', 'Online & on-site'],
  },
  {
    icon: Search,
    title: 'Observation',
    details: ['Naturalistic', 'Covert', 'In pairs'],
  },
  {
    icon: LayoutGrid,
    title: 'Thematic Analysis',
    details: ['Affinity mapping', '4 themes identified', 'Inductive approach'],
  },
]

const stats = [
  { number: '8', label: 'Participants' },
  { number: '3', label: 'Age groups' },
  { number: '2', label: 'Stakeholder types' },
]

export default function ResearchMethods() {
  return (
    <div className="flex flex-col gap-6">
      {/* Process steps */}
      <div className="flex items-start">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <>
              <div key={step.title} className="flex flex-col items-center gap-2 w-[30%] shrink-0">
                <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-neutral-800 text-center">{step.title}</p>
                {step.details.map((d) => (
                  <p key={d} className="text-xs text-neutral-500 text-center leading-snug">{d}</p>
                ))}
              </div>
              {i < steps.length - 1 && (
                <div key={`connector-${i}`} className="h-[2px] bg-neutral-300 flex-1 mt-6 mx-[-10px]" />
              )}
            </>
          )
        })}
      </div>

      {/* Stats */}
      <div className="border-t border-neutral-200 pt-4 grid grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-medium text-neutral-900">{stat.number}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
