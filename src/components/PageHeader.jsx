export default function PageHeader({ title, subtitle, right }) {
  return (
    <div className="mb-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {right}
      </div>
    </div>
  )
}


