export function CharacterValidator(str: string): boolean {
  const allowedCharacters = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~ ]+$/;
  return allowedCharacters.test(str);
}
  
export function PasswordValidator(str: string): boolean {
  if (!CharacterValidator(str)) return false;
  const hasLowercase = /[a-záéíóöőúüű]/.test(str);
  const hasUppercase = /[A-ZÁÉÍÓÖŐÚÜŰ]/.test(str);
  const hasNumber = /[0-9]/.test(str);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(str);
  return str.length >= 8 && hasLowercase && hasUppercase && hasNumber && hasSpecialChar;
}
  
export function EmailValidator(str: string): boolean {
  const emailPattern = /^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,7}$/;
  return emailPattern.test(str);
}

export interface ValidationInterface {
  error: boolean,
  errori18n: string
}