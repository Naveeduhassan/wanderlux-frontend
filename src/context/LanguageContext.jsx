import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: 'Home',
    about: 'About Us',
    destinations: 'Destinations',
    packages: 'Tour Packages',
    gallery: 'Gallery',
    testimonials: 'Testimonials',
    blog: 'Blog',
    faq: 'FAQ',
    contact: 'Contact',
    bookNow: 'Book Now',
    signIn: 'Sign In',
    exploreWorld: 'Explore The World With Confidence',
    heroTagline: 'Handcrafted luxury tours & bespoke adventures created for discerning travelers.',
    aiConcierge: 'AI Concierge',
    searchPlaceholder: 'Where do you want to go?'
  },
  es: {
    home: 'Inicio',
    about: 'Nosotros',
    destinations: 'Destinos',
    packages: 'Paquetes',
    gallery: 'Galería',
    testimonials: 'Testimonios',
    blog: 'Blog',
    faq: 'Preguntas',
    contact: 'Contacto',
    bookNow: 'Reservar Ahora',
    signIn: 'Iniciar Sesión',
    exploreWorld: 'Explora El Mundo Con Confianza',
    heroTagline: 'Tours de lujo artesanales y aventuras a medida diseñadas para viajeros exigentes.',
    aiConcierge: 'Asistente IA',
    searchPlaceholder: '¿A dónde quieres ir?'
  },
  fr: {
    home: 'Accueil',
    about: 'À Propos',
    destinations: 'Destinations',
    packages: 'Circuits',
    gallery: 'Galerie',
    testimonials: 'Avis',
    blog: 'Blog',
    faq: 'FAQ',
    contact: 'Contact',
    bookNow: 'Réserver',
    signIn: 'Connexion',
    exploreWorld: 'Explorez Le Monde En Toute Confiance',
    heroTagline: 'Voyages de luxe sur mesure créés pour les voyageurs exigeants.',
    aiConcierge: 'Concierge IA',
    searchPlaceholder: 'Où voulez-vous aller ?'
  },
  de: {
    home: 'Startseite',
    about: 'Über Uns',
    destinations: 'Reiseziele',
    packages: 'Reisepakete',
    gallery: 'Galerie',
    testimonials: 'Bewertungen',
    blog: 'Blog',
    faq: 'FAQ',
    contact: 'Kontakt',
    bookNow: 'Jetzt Buchen',
    signIn: 'Anmelden',
    exploreWorld: 'Entdecken Sie Die Welt Mit Vertrauen',
    heroTagline: 'Maßgeschneiderte Luxusreisen für anspruchsvolle Reisende.',
    aiConcierge: 'KI Concierge',
    searchPlaceholder: 'Wohin möchten Sie reisen?'
  }
};

export const currencyRates = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  AED: { symbol: 'AED ', rate: 3.67 }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('wanderlux_lang') || 'en');
  const [currency, setCurrency] = useState(() => localStorage.getItem('wanderlux_currency') || 'USD');
  const theme = 'light';

  useEffect(() => {
    localStorage.setItem('wanderlux_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('wanderlux_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('wanderlux_theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const formatPrice = (amountUSD) => {
    const numericUSD = typeof amountUSD === 'number' ? amountUSD : Number(String(amountUSD).replace(/[^0-9.]/g, '')) || 0;
    const curr = currencyRates[currency] || currencyRates.USD;
    const converted = Math.round(numericUSD * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, currency, setCurrency, theme, formatPrice, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
