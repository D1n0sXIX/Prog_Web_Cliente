'use client'

/**
 * ============================================
 * 📅 DECADE WIDGET
 * ============================================
 * 
 * Según el README del profesor:
 * - Recibe props: onSelect, selectedDecades
 * - Emite cambios al componente padre (Dashboard)
 * - Selector de décadas (1950s, 1960s... 2020s)
 * - Múltiple selección
 */

const DECADES = [
  { label: '1950s', start: 1950, end: 1959 },
  { label: '1960s', start: 1960, end: 1969 },
  { label: '1970s', start: 1970, end: 1979 },
  { label: '1980s', start: 1980, end: 1989 },
  { label: '1990s', start: 1990, end: 1999 },
  { label: '2000s', start: 2000, end: 2009 },
  { label: '2010s', start: 2010, end: 2019 },
  { label: '2020s', start: 2020, end: 2029 }
]

export default function DecadeWidget({ selectedDecades = [], onSelect }) {
  /**
   * Toggle selección de década
   * Comunica el cambio al padre mediante onSelect
   */
  const toggleDecade = (decade) => {
    const exists = selectedDecades.find(d => d.label === decade.label)
    if (exists) {
      onSelect(selectedDecades.filter(d => d.label !== decade.label))
    } else {
      onSelect([...selectedDecades, decade])
    }
  }

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-3">📅 Décadas</h3>

      <div className="grid grid-cols-2 gap-2">
        {DECADES.map(decade => (
          <button
            key={decade.label}
            onClick={() => toggleDecade(decade)}
            className="px-3 py-2 rounded text-sm transition-colors"
            style={selectedDecades.find(d => d.label === decade.label)
              ? { backgroundColor: 'var(--primary)', color: 'white' }
              : { backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)' }
            }
          >
            {decade.label}
          </button>
        ))}
      </div>

      {selectedDecades.length > 0 && (
        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
          Seleccionadas: {selectedDecades.map(d => d.label).join(', ')}
        </p>
      )}
    </div>
  )
}
