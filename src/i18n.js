import { createI18n } from 'vue-i18n';

// Import ทุกไฟล์ JSON ของแต่ละภาษา
import en from './locales/en.json';
import vn from './locales/vn.json';
import la from './locales/la.json';

// รวมเป็น object เดียว
// const messages = { en, vn, la };
const messages = {
  en: en.en, // <--- สังเกตต้องเข้าถึง object ภายใน "en"
  la: la.la,
  vn: vn.vn
}

// อ่านภาษาที่บันทึกไว้หรือใช้ภาษาของ browser เป็นค่า default
// const savedLocale = localStorage.getItem('user-locale') || navigator.language.split('-')[0] || 'la';
const savedLocale = localStorage.getItem('user-locale') || 'la';


const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'la',
  messages,  // ใช้ object messages หลายภาษา
  legacy: false
});

export default i18n;
