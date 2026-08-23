import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const langRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="d-inline-flex align-items-center gap-2">

      {/* Language Selector Dropdown */}
      <div className="position-relative" ref={langRef}>
        <button 
          type="button"
          onClick={() => { setIsLangOpen(!isLangOpen); }}
          className="btn btn-sm text-slate-200 border-0 px-2 py-1 rounded-pill d-inline-flex align-items-center gap-1 shadow-sm"
          style={{ background: 'rgba(255, 255, 255, 0.12)', fontSize: '0.78rem' }}
        >
          <Globe size={13} className="text-info" />
          <span className="text-uppercase fw-semibold">{lang}</span>
        </button>

        {isLangOpen && (
          <ul 
            className="dropdown-menu dropdown-menu-end show shadow-lg border-0 rounded-3 p-1 position-absolute" 
            style={{ minWidth: '130px', fontSize: '0.82rem', right: 0, top: '100%', marginTop: '6px', zIndex: 10000 }}
          >
            <li>
              <button className={`dropdown-item rounded-2 py-1 ${lang === 'en' ? 'active fw-bold' : ''}`} onClick={() => { setLang('en'); setIsLangOpen(false); }}>
                🇺🇸 English
              </button>
            </li>
            <li>
              <button className={`dropdown-item rounded-2 py-1 ${lang === 'es' ? 'active fw-bold' : ''}`} onClick={() => { setLang('es'); setIsLangOpen(false); }}>
                🇪🇸 Español
              </button>
            </li>
            <li>
              <button className={`dropdown-item rounded-2 py-1 ${lang === 'fr' ? 'active fw-bold' : ''}`} onClick={() => { setLang('fr'); setIsLangOpen(false); }}>
                🇫🇷 Français
              </button>
            </li>
            <li>
              <button className={`dropdown-item rounded-2 py-1 ${lang === 'de' ? 'active fw-bold' : ''}`} onClick={() => { setLang('de'); setIsLangOpen(false); }}>
                🇩🇪 Deutsch
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default LanguageSelector;
