
export default function PreferenciasSeleccionadas({ data }) {
  if (!data) return null;

  const { tipoEntrenamiento, objetivos, disponibilidad } = data;

  const joinSafe = (val) => (Array.isArray(val) ? val.join(", ") : val || "—");

  return (
    <section aria-label="Preferencias seleccionadas">
      <h3>Preferencias seleccionadas</h3>
  <p><strong>Entrenamientos seleccionados:</strong> {joinSafe(tipoEntrenamiento)}</p>
  <p><strong>Objetivos seleccionados:</strong> {joinSafe(objetivos)}</p>
  <p><strong>Disponibilidad seleccionada:</strong> {joinSafe(disponibilidad)}</p>
    </section>
  );
}
