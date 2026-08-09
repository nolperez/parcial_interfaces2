/** Normaliza composicion de plato (array o texto separado por comas). */
export function parseComposicion(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === 'string' && value.trim()) {
    return value
      .split(/[,;\n]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

export function composicionToText(value) {
  return parseComposicion(value).join(', ');
}
