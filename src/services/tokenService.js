import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const USER_DATA_KEY = import.meta.env.VITE_USER_DATA_KEY;


export function setToken(token) {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  localStorage.setItem(TOKEN_KEY, encrypted);
}

export function getToken() {
  const encrypted = localStorage.getItem(TOKEN_KEY);
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error('❌ Failed to decrypt token:', err);
    return null;
  }
}

export function setUser(user) {
  const userString = JSON.stringify(user);
  const encrypted = CryptoJS.AES.encrypt(userString, SECRET_KEY).toString();
  localStorage.setItem(USER_DATA_KEY, encrypted);
}


export function getUser() {
  const encrypted = localStorage.getItem(USER_DATA_KEY);
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (err) {
    console.error('❌ Failed to decrypt user:', err);
    return null;
  }
}

export function removeAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
}
