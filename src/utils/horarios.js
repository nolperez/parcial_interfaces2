/** Horarios de atención: 08:00 AM – 10:00 PM (cada 30 min) */
export const HORA_APERTURA = '08:00';
export const HORA_CIERRE = '22:00';

export function buildHorarios(stepMinutes = 30) {
  const slots = [];
  const [openH, openM] = HORA_APERTURA.split(':').map(Number);
  const [closeH, closeM] = HORA_CIERRE.split(':').map(Number);
  let minutes = openH * 60 + openM;
  const end = closeH * 60 + closeM;

  while (minutes <= end) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    slots.push({ value, label: formatHora12(value) });
    minutes += stepMinutes;
  }
  return slots;
}

export function formatHora12(hhmm) {
  const [hStr, mStr] = String(hhmm || '').split(':');
  let h = Number(hStr);
  const m = mStr || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
}

export const HORARIOS_RESERVA = buildHorarios(30);

export function esHorarioValido(hora) {
  if (!hora) return false;
  const value = String(hora).slice(0, 5);
  return HORARIOS_RESERVA.some((s) => s.value === value);
}
