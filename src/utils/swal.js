import Swal from 'sweetalert2';

const base = {
  background: '#2a2a2a',
  color: '#fff',
  confirmButtonColor: '#d4580e',
  cancelButtonColor: '#5c2c2c',
  reverseButtons: true,
  customClass: {
    popup: 'swal-gourmet',
    title: 'swal-gourmet-title',
    htmlContainer: 'swal-gourmet-text',
    confirmButton: 'swal-gourmet-confirm',
    cancelButton: 'swal-gourmet-cancel',
  },
};

export const swal = Swal.mixin(base);

const Toast = Swal.mixin({
  ...base,
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2800,
  timerProgressBar: true,
});

export function swalSuccess(message, title = 'Listo') {
  return Toast.fire({ icon: 'success', title: title === 'Listo' ? message : title, text: title === 'Listo' ? undefined : message });
}

export function swalError(message, title = 'Error') {
  return swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonText: 'Entendido',
  });
}

export function swalWarning(message, title = 'Atención') {
  return swal.fire({
    icon: 'warning',
    title,
    text: message,
    confirmButtonText: 'Entendido',
  });
}

export function swalInfo(message, title = 'Aviso') {
  return Toast.fire({ icon: 'info', title: message || title });
}

export async function swalConfirm(message, title = '¿Continuar?') {
  const result = await swal.fire({
    icon: 'question',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
  });
  return result.isConfirmed;
}

const FIELD_LABELS = {
  nombremessa: 'nombre de mesa',
  codigoinventario: 'código de inventario',
  email: 'correo',
  password: 'contraseña',
  name: 'nombre',
  nombre: 'nombre',
  telefono: 'teléfono',
  mesa_id: 'mesa',
  numero_documento: 'número de documento',
};

function humanizeValidationMessage(field, message) {
  const label = FIELD_LABELS[field] || String(field || '').replaceAll('_', ' ');
  const msg = String(message || '');
  if (/already been taken/i.test(msg) || /has already been taken/i.test(msg) || /ya ha sido tomado/i.test(msg) || /ya está registrado/i.test(msg)) {
    return msg.match(/ya existe|ya está/i) ? msg : `El ${label} ya está registrado.`;
  }
  if (/required/i.test(msg) || /es obligatorio/i.test(msg)) {
    return msg.match(/obligatorio/i) ? msg : `El campo ${label} es obligatorio.`;
  }
  if (/must be a valid email/i.test(msg)) return 'Ingresa un correo válido.';
  // Evitar mensajes técnicos en inglés del backend
  if (/^[A-Z][a-z].*\b(has|must|already|invalid)\b/i.test(msg)) {
    return `Revisa el campo ${label}.`;
  }
  return msg;
}

/**
 * Valida duplicados locales (antes de llamar a la API).
 * @param {object} form valores del formulario
 * @param {Array} items lista actual
 * @param {Array<{key:string,label?:string}>} fields campos únicos
 * @param {object|null} editing registro en edición
 * @returns {boolean} true si ok
 */
export function validateUniqueFields(form, items, fields = [], editing = null) {
  if (!fields?.length) return true;
  const list = Array.isArray(items) ? items : [];
  const editingId = editing?.id ?? editing?.idmesa ?? null;

  for (const field of fields) {
    const key = field.key;
    const raw = form?.[key];
    if (raw === null || raw === undefined || String(raw).trim() === '') continue;
    const value = String(raw).trim().toLowerCase();
    const dup = list.find((item) => {
      const id = item.id ?? item.idmesa;
      if (editingId != null && id === editingId) return false;
      return String(item[key] ?? '').trim().toLowerCase() === value;
    });
    if (dup) {
      const label = field.label || FIELD_LABELS[key] || key.replaceAll('_', ' ');
      swalWarning(`Ya existe un registro con este ${label}.`, 'Dato duplicado');
      return false;
    }
  }
  return true;
}

/** Extrae mensaje útil de errores Axios / Laravel */
export function getApiErrorMessage(err, fallback = 'Ocurrió un error') {
  const errors = err?.response?.data?.errors;
  if (errors && typeof errors === 'object') {
    const firstKey = Object.keys(errors)[0];
    const firstMsg = errors[firstKey]?.[0];
    if (firstMsg) return humanizeValidationMessage(firstKey, firstMsg);
  }

  const message = err?.response?.data?.message;
  if (message && !/^The .+ has already been taken\.?$/i.test(message)) {
    return message;
  }
  if (message) {
    const match = message.match(/^The (.+) has already been taken\.?$/i);
    if (match) return humanizeValidationMessage(match[1], message);
  }

  return err?.message || fallback;
}

export function swalApiError(err, fallback = 'Ocurrió un error') {
  return swalError(getApiErrorMessage(err, fallback));
}

function fieldLabel(el) {
  if (!el) return 'Campo';
  const id = el.id;
  if (id) {
    const label = el.form?.querySelector(`label[for="${id}"]`);
    if (label?.textContent) return label.textContent.trim();
  }
  const groupLabel = el.closest('.mb-3, .form-group, [class*="col-"]')?.querySelector('label, .form-label');
  if (groupLabel?.textContent) return groupLabel.textContent.trim();
  return el.getAttribute('placeholder')
    || el.getAttribute('name')
    || el.getAttribute('aria-label')
    || 'Campo requerido';
}

function isEmptyValue(el) {
  if (el.type === 'checkbox' || el.type === 'radio') return !el.checked;
  if (el.tagName === 'SELECT') return !String(el.value || '').trim();
  return !String(el.value || '').trim();
}

/**
 * Valida campos required del formulario.
 * @returns {boolean} true si todo ok
 */
export function validateRequiredForm(formEl) {
  if (!formEl) return true;

  const required = Array.from(formEl.querySelectorAll('[required]')).filter(
    (el) => !el.disabled && el.type !== 'hidden' && !el.closest('[hidden], [aria-hidden="true"]')
  );

  const missing = required.filter(isEmptyValue);

  if (missing.length === 0) {
    if (typeof formEl.checkValidity === 'function' && !formEl.checkValidity()) {
      const invalid = formEl.querySelector(':invalid');
      const label = fieldLabel(invalid);
      swalWarning(`Revisa el campo: ${label}`, 'Dato inválido');
      invalid?.focus?.();
      return false;
    }
    return true;
  }

  const labels = [...new Set(missing.map(fieldLabel))];
  const list = labels.slice(0, 6).map((l) => `• ${l}`).join('\n');
  const extra = labels.length > 6 ? `\n• …y ${labels.length - 6} más` : '';

  swalWarning(
    `Completa los campos obligatorios:\n\n${list}${extra}`,
    'Campos requeridos'
  );
  missing[0]?.focus?.();
  return false;
}

/**
 * Valida un objeto contra claves requeridas (útil sin DOM).
 */
export function validateRequiredFields(values, fields, labels = {}) {
  const missing = fields.filter((key) => {
    const val = values?.[key];
    if (val === null || val === undefined) return true;
    if (typeof val === 'string') return !val.trim();
    if (typeof val === 'number') return Number.isNaN(val);
    if (Array.isArray(val)) return val.length === 0;
    return false;
  });

  if (missing.length === 0) return true;

  const list = missing
    .slice(0, 6)
    .map((key) => `• ${labels[key] || key.replaceAll('_', ' ')}`)
    .join('\n');

  swalWarning(`Completa los campos obligatorios:\n\n${list}`, 'Campos requeridos');
  return false;
}
