export function validationText(value, type) {
  switch (type) {
    case "text":
      if (value.length > 0) {
        return "";
      } else {
        return "Este campo es obligatorio";
      }
    case "email":
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value.match(emailRegex)) {
        return "Ingresa un correo electrónico válido";
      } else {
        return "";
      }
    case "tel":
      if (value.length <= 8) {
        return "Usa el formato: 1234-5678";
      } else {
        return "";
      }
    case "textarea":
      if (value.length > 0) {
        return "";
      } else {
        return "Este campo es obligatorio";
      }
  }
}

export const validationPassword = (passText) => {
  const passRegex = {
    lower: /(?=.*[a-z])/,
    upper: /(?=.*[A-Z])/,
    number: /(?=.*\d)/,
  };

  const validation = {
    hasError: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    minLength: 8,
  };

  if (passText.match(passRegex.lower)) {
    validation.hasLower = true;
  } else {
    validation.hasLower = false;
  }

  if (passText.match(passRegex.upper)) {
    validation.hasUpper = true;
  } else {
    validation.hasUpper = false;
  }

  if (passText.match(passRegex.number)) {
    validation.hasNumber = true;
  } else {
    validation.hasNumber = false;
  }

  if (
    validation.hasLower &&
    validation.hasUpper &&
    validation.hasNumber &&
    passText.length >= validation.minLength
  ) {
    validation.hasError = false;
  } else {
    validation.hasError = true;
  }

  return validation;
};
