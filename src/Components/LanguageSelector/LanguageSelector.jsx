import { useLanguage } from '../../context/LanguageContext';
import { Globe, DollarSign, Sun, Moon } from 'lucide-react';

function LanguageSelector() {
  const { lang, setLang, currency, setCurrency, theme, toggleTheme } = useLanguage();

  return (
    <div className="d-inline-flex align-items-center gap-2">
      {/* Theme Toggle Button */}
      <button 
        type="button" 
        onClick={toggleTheme} 
        className="btn btn-sm text-slate-300 border-0 p-1-5 rounded-circle d-flex align-items-center justify-content-center"
        style={{ background: 'rgba(255, 255, 255, 0.08)', width: '32px', height: '32px' }}
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        aria-label="Toggle dark/light theme"
      >
        {theme === 'dark' ? <Sun size={15} className="text-warning" /> : <Moon size={15} className="text-primary" />}
      </button>

      {/* Language Selector Dropdown */}
      <div className="dropdown">
        <button 
          className="btn btn-sm text-slate-200 border-0 px-2 py-1 rounded-pill d-inline-flex align-items-center gap-1 dropdown-toggle" 
          type="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
          style={{ background: 'rgba(255, 255, 255, 0.08)', fontSize: '0.78rem' }}
        >
          <Globe size={13} className="text-info" />
          <span className="text-uppercase fw-semibold">{lang}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-1" style={{ minWidth: '130px', fontSize: '0.82rem' }}>
          <li>
            <button className={`dropdown-item rounded-2 py-1 ${lang === 'en' ? 'active fw-bold' : ''}`} onClick={() => setLang('en')}>
              🇺🇸 English
            </button>
          </li>
          <li>
            <button className={`dropdown-item rounded-2 py-1 ${lang === 'es' ? 'active fw-bold' : ''}`} onClick={() => setLang('es')}>
              🇪🇸 Español
            </button>
          </li>
          <li>
            <button className={`dropdown-item rounded-2 py-1 ${lang === 'fr' ? 'active fw-bold' : ''}`} onClick={() => setLang('fr')}>
              🇫🇷 Français
            </button>
          </li>
          <li>
            <button className={`dropdown-item rounded-2 py-1 ${lang === 'de' ? 'active fw-bold' : ''}`} onClick={() => setLang('de')}>
              🇩🇪 Deutsch
            </button>
          </li>
        </ul>
      </div>

      {/* Currency Selector Dropdown */}
      <div className="dropdown">
        <button 
          className="btn btn-sm text-slate-200 border-0 px-2 py-1 rounded-pill d-inline-flex align-items-center gap-1 dropdown-toggle" 
          type="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
          style={{ background: 'rgba(255, 255, 255, 0.08)', fontSize: '0.78rem' }}
        >
          <DollarSign size={13} className="text-success" />
          <span className="fw-semibold">{currency}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-1" style={{ minWidth: '120px', fontSize: '0.82rem' }}>
          <li>
            <button className={`dropdown-item rounded-2 py-1 ${currency === 'USD' ? 'active fw-bold' : ''}`} onClick={() => setCurrency('USD')}>
              $ USD
            </button>
          </li>
          <li>
            <button className={`dropdown-item rounded-2 py-1 ${currency === 'EUR' ? 'active fw-bold' : ''}`} onClick={() => setCurrency('EUR')}>
              € EUR
            </button>
          </li>
          <li>
            <button className={`dropdown-item rounded-2 py-1 ${currency === 'GBP' ? 'active fw-bold' : ''}`} onClick={() => setCurrency('GBP')}>
              £ GBP
            </button>
          </li>
          <li>
            <button className={`dropdown-item rounded-2 py-1 ${currency === 'AED' ? 'active fw-bold' : ''}`} onClick={() => setCurrency('AED')}>
              AED
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LanguageSelector;
