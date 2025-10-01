export default function StatusBadge({ status }) {
  const map = {
    preparing: 'bg-amber-100 text-amber-800 ring-amber-200',
    served: 'bg-blue-100 text-blue-800 ring-blue-200',
    completed: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
    idle: 'bg-gray-100 text-gray-700 ring-gray-200',
  }
  const cls = map[status] || 'bg-gray-100 text-gray-700 ring-gray-200'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ring-1 ring-inset ${cls}`}>
      {status}
    </span>
  )
}


