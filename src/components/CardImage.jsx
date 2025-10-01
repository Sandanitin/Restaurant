export default function CardImage({ src, alt, seed = 'card', width = 600, height = 360 }) {
  const safeSrc = src && src.length > 0 ? src : `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`
  return (
    <img src={safeSrc} alt={alt || ''} className="w-full object-cover" style={{ height: `${Math.round(height / 2)}px` }} />
  )
}


