import { Map, ShoppingBag, CreditCard, MapPin } from 'lucide-react'

const findings = [
  {
    icon: Map,
    title: 'Navigation',
    description: '4 out of 8 participants struggled to find specific stalls. Rotating weekly layouts made even regular visitors disoriented.',
  },
  {
    icon: ShoppingBag,
    title: 'Shopping Experience',
    description: 'Visitors lacked product information — dietary filters, provenance, and seasonal availability were all invisible to shoppers.',
  },
  {
    icon: CreditCard,
    title: 'Payment Method',
    description: 'ATM locations were unclear and hard to find, leading visitors to unknowingly pay card surcharges on every purchase.',
  },
  {
    icon: MapPin,
    title: 'Purpose of Visit',
    description: 'Visitors came for groceries, social outings, and tourism. Understanding motivations helped shape personalised feature design.',
  },
]

const stats = [
  { value: '4/8', label: 'visitors got lost' },
  { value: 'Weekly', label: 'stall rotation' },
  { value: '600+', label: 'stalls, no filter' },
]

export default function KeyFindings() {
  return (
    <div className="flex flex-col gap-6">
      {/* 2x2 grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {findings.map((finding) => {
          const Icon = finding.icon
          return (
            <div key={finding.title} className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center text-neutral-600 shrink-0">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-neutral-800">{finding.title}</p>
              <p className="text-xs text-neutral-500 leading-relaxed">{finding.description}</p>
            </div>
          )
        })}
      </div>

      {/* Stats row */}
      <div className="border-t border-neutral-200 pt-4 grid grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl font-medium text-neutral-900">{stat.value}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
