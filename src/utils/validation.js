/**
 * Input Validation Utilities for WanderLux Frontend
 */

export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  // Allows international formats, digits, spaces, hyphens, plus sign, min 7 digits
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
  return phoneRegex.test(phone.trim());
};

export const validateTravelersCount = (count) => {
  const num = Number(count);
  return Number.isInteger(num) && num >= 1 && num <= 50;
};

export const validateTravelDate = (dateString) => {
  if (!dateString) return false;
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};

export const sanitizeString = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.trim();
};
