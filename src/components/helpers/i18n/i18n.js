import I18n from 'react-native-i18n';
import en from './locales/en';
import sr from './locales/sr';

I18n.fallbacks = true;

I18n.translations = {
    sr,
    en,
};

export default I18n;
