import { HomeAssistant } from 'custom-card-helpers';
import de from './translations/de';
import en from './translations/en';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let hass: HomeAssistant | any;

export function setHass(newHass: HomeAssistant) {
  hass = newHass;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTranslated(key: string, lang: any, translations: any) {
  const keys = key.split('.');
  let result = translations[lang];
  for (const k of keys) {
    if (result === undefined) {
      break;
    }
    result = result[k];
  }
  return result;
}

export function localize(key: string, search = '', replace = '') {
  const lang = hass?.locale?.language || 'en';
  const translations = {
    de,
    en,
  };

  let translated = getTranslated(key, lang, translations);

  if (translated === undefined) {
    // Try english as a fallback
    translated = getTranslated(key, 'en', translations);
  }

  if (translated === undefined) {
    // Fallback to the key itself
    translated = key;
  }

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}
