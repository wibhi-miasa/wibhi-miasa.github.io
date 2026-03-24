const criteria = [
  {
    title: 'Real-time guidance',
    description: 'Adapts as the user moves through the market',
    staticMap: false,
    qrCode: false,
    ar: true,
  },
  {
    title: 'Adapts to rotating stalls',
    description: 'Handles weekly stall location changes',
    staticMap: false,
    qrCode: false,
    ar: true,
  },
  {
    title: 'Visual wayfinding',
    description: 'Overlays direction onto the physical environment',
    staticMap: false,
    qrCode: 'partial' as const,
    ar: true,
  },
  {
    title: 'Personalised recommendations',
    description: 'Tailored to dietary needs and interests',
    staticMap: false,
    qrCode: false,
    ar: true,
  },
  {
    title: 'Works for first-time visitors',
    description: 'No prior knowledge of the market required',
    staticMap: false,
    qrCode: 'partial' as const,
    ar: true,
  },
]

function Cell({ value }: { value: boolean | 'partial' }) {
  if (value === true) return <span className="text-emerald-600 font-medium">✓</span>
  if (value === 'partial') return (
    <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">Partial</span>
  )
  return <span className="text-red-400">✗</span>
}

export default function DesignDecision() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-2 pr-4 text-xs uppercase tracking-widest text-neutral-400 font-normal w-[45%]">
              Criteria
            </th>
            <th className="py-2 px-3 text-center text-xs uppercase tracking-widest text-neutral-400 font-normal">
              Static Map
            </th>
            <th className="py-2 px-3 text-center text-xs uppercase tracking-widest text-neutral-400 font-normal">
              QR Code
            </th>
            <th className="py-2 px-3 text-center text-xs uppercase tracking-widest text-neutral-900 font-semibold bg-emerald-50 rounded-t-md">
              AR Nav
            </th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((row, i) => (
            <tr key={row.title} className={`border-b border-neutral-100 ${i === criteria.length - 1 ? 'border-0' : ''}`}>
              <td className="py-3 pr-4">
                <p className="text-xs font-medium text-neutral-800">{row.title}</p>
                <p className="text-xs text-neutral-400 mt-0.5 leading-snug">{row.description}</p>
              </td>
              <td className="py-3 px-3 text-center">
                <Cell value={row.staticMap} />
              </td>
              <td className="py-3 px-3 text-center">
                <Cell value={row.qrCode} />
              </td>
              <td className="py-3 px-3 text-center bg-emerald-50">
                <Cell value={row.ar} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
