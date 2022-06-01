const msgErrors = {
  string: "Debe tener entre 3 y 40 carácteres.",
  password: "Debe tener más de 6 carácteres.",
  telefono: "Debe tener más de 9 números.",
  email: "El correo electrónico no es válido.",
  dni: 'DNI incorrecto, la letra del NIF no es correcta.',
  codigo_postal: 'Debe tener 5 números.',
};

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const regexPassword = /[a-zA-Z0-9]{6,}$/;
const regexString = /^[a-zA-Z\u00C0-\u017F\s]{3,40}$/;
const regexTelefono = /^[0-9]{9,}$/;
const regexDNI = /^[XYZ]?\d{5,8}[A-Z]$/;

export const validarString = (value) => {
  if (regexString.test(value) === false) {
    return msgErrors.string
  } else {
    return true
  }
}

export const validarEmail = (value) => {
  if (regexEmail.test(value) === false) {
    return msgErrors.email
  } else {
    return true
  }
}

export const validarPassword = (value) => {
  if (regexPassword.test(value) === false) {
    return msgErrors.password
  } else {
    return true
  }
}

export const validarTelefono = (value) => {
  if (regexTelefono.test(value) === false) {
    return msgErrors.telefono
  } else {
    return true
  }
}

export const validarCodigoPostal = (value) => {
  if (value.length < 5) {
    return msgErrors.codigo_postal
  } else {
    return true
  }
}

export const validarDNI = (value) => {
  value = value.toUpperCase();
  if (regexDNI.test(value) === true) {
    let numero = value.substr(0, value.length - 1);
    numero = numero.replace('X', 0);
    numero = numero.replace('Y', 1);
    numero = numero.replace('Z', 2);
    numero = numero % 23;

    let letra = value.substr(value.length - 1, 1);
    let letraDNI = 'TRWAGMYFPDXBNJZSQVHLCKET';
    letraDNI = letraDNI.substring(numero, numero + 1);

    if (letraDNI != letra) {
      return msgErrors.dni
    } else {
      return true
    }
  } else {
    return 'Formato no válido.'
  }
}