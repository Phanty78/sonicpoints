// Get informations from localStorage
export function getLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    // Vérifier si l'item existe
    if (!item) return null;
    // Convertir la chaîne JSON en objet
    return JSON.parse(item);
  } catch (error) {
    console.error('Error getting localStorage:', error);
    return null;
  }
}

export function setLocalStorage(key, value) {
  try {
    // Convertir l'objet en chaîne JSON
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
}

// Remove informations from localStorage
export function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing localStorage:', error);
  }
}
