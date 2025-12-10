'use client'

/**
 * POPULARITY WIDGET
 * Según el README:
 * - Recibe props: onSelect, popularityRange
 * - Emite cambios al componente padre (Dashboard)
 * - Slider o categorías (Mainstream 80-100, Popular 50-80, Underground 0-50)
 * - Filtrar canciones por popularidad
 */
 // Presets de popularidad
const PRESETS = [
  { label: 'Mainstream', min: 80, max: 100, emoji: '🔥' },
  { label: 'Popular', min: 50, max: 80, emoji: '⭐' },
  { label: 'Underground', min: 0, max: 50, emoji: '💎' },
  { label: 'Todo', min: 0, max: 100, emoji: '🎵' }
]
// Componente PopularityWidget
export default function PopularityWidget({ popularityRange = { min: 0, max: 100 }, onSelect }) {
  const isPresetActive = (preset) => {
    return popularityRange.min === preset.min && popularityRange.max === preset.max
  }

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-3">Popularidad</h3>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {PRESETS.map(preset => ( // Mapeo de botones de presets
          <button key={preset.label} onClick={() => onSelect({ min: preset.min, max: preset.max })}
            className="px-3 py-2 rounded text-sm transition-colors"
            style={isPresetActive(preset)
              ? { backgroundColor: 'var(--primary)', color: 'white' }
              : { backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)' }
            }
          >
            {preset.emoji} {preset.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: 'var(--text-secondary)' }}>Mínimo</span> {/* Label for minimum popularity */}
            <span style={{ color: 'var(--primary)' }}>{popularityRange.min}</span> {/* Display current minimum value */}
          </div>
          <input type="range"
            min="0"
            max="100"
            value={popularityRange.min}
            onChange={(e) => onSelect({ ...popularityRange, min: parseInt(e.target.value) })}
            className="w-full"
            style={{ accentColor: 'var(--primary)' }}
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: 'var(--text-secondary)' }}>Máximo</span> {/* Label for maximum popularity */}
            <span style={{ color: 'var(--primary)' }}>{popularityRange.max}</span> {/* Display current maximum value */}
          </div>
          <input type="range"
            min="0"
            max="100"
            value={popularityRange.max}
            onChange={(e) => onSelect({ ...popularityRange, max: parseInt(e.target.value) })}
            className="w-full"
            style={{ accentColor: 'var(--primary)' }}
          />
        </div>
      </div>
    </div>
  )
}
