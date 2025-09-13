import React, { useState } from 'react';
import { Menu, X, Globe, Heart, QrCode, FileText, Users, Shield, Bell } from 'lucide-react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const languages = {
    en: 'English',
    hi: 'हिंदी',
    ml: 'മലയാളം',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    bn: 'বাংলা'
  };

  const navItems = {
    en: {
      home: 'Home',
      healthCard: 'Health Card',
      medicalRecords: 'Medical Records',
      findDoctors: 'Find Doctors',
      surveillance: 'Health Surveillance',
      about: 'About',
      contact: 'Contact'
    },
    hi: {
      home: 'होम',
      healthCard: 'स्वास्थ्य कार्ड',
      medicalRecords: 'मेडिकल रिकॉर्ड',
      findDoctors: 'डॉक्टर खोजें',
      surveillance: 'स्वास्थ्य निगरानी',
      about: 'हमारे बारे में',
      contact: 'संपर्क'
    },
    ml: {
      home: 'ഹോം',
      healthCard: 'ആരോഗ്യ കാർഡ്',
      medicalRecords: 'മെഡിക്കൽ റെക്കോർഡ്സ്',
      findDoctors: 'ഡോക്ടർമാരെ കണ്ടെത്തുക',
      surveillance: 'ആരോഗ്യ നിരീക്ഷണം',
      about: 'ഞങ്ങളെ കുറിച്ച്',
      contact: 'ബന്ധപ്പെടുക'
    }
  };

  const currentNav = navItems[currentLang] || navItems.en;

  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-main">

          {/* Logo and Brand */}
          <div className="brand-section">
            <div className="logo-container">
              <Heart className="logo-icon" />
            </div>
            <div className="brand-text">
              <h1 className="brand-title">careLink</h1>
              <p className="brand-subtitle">Digital Health Records</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <Link to="/" className="nav-link">
              <span>{currentNav.home}</span>
            </Link>

            <Link to="/healthCard" className="nav-link">
              <QrCode className="nav-icon" />
              <span>{currentNav.healthCard}</span>
            </Link>

            <Link to="/medical-records" className="nav-link">
              <FileText className="nav-icon" />
              <span>{currentNav.medicalRecords}</span>
            </Link>

            <Link to="/find-doctors" className="nav-link">
              <Users className="nav-icon" />
              <span>{currentNav.findDoctors}</span>
            </Link>

            <Link to="/surveillance" className="nav-link">
              <Shield className="nav-icon" />
              <span>{currentNav.surveillance}</span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="right-actions">
            {/* Language Selector */}
            <div className="language-selector">
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="language-select"
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
              <Globe className="globe-icon" />
            </div>

            {/* Notifications */}
            <button className="notification-btn">
              <Bell className="bell-icon" />
              <span className="notification-badge"></span>
            </button>

            {/* Auth Buttons */}
            <div className="auth-buttons">
              <Link to="/login">
                <button className="btn btn-secondary">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary">Register</button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-container">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-btn"
            >
              {isOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isOpen ? "visible" : "hidden"}`}>
          <div className="mobile-nav-container">
            <Link to="/" className="mobile-nav-link">
              <span>{currentNav.home}</span>
            </Link>
            <Link to="/healthCard" className="mobile-nav-link">
              <QrCode className="nav-icon" />
              <span>{currentNav.healthCard}</span>
            </Link>
            <Link to="/medical-records" className="mobile-nav-link">
              <FileText className="nav-icon" />
              <span>{currentNav.medicalRecords}</span>
            </Link>
            <Link to="/find-doctors" className="mobile-nav-link">
              <Users className="nav-icon" />
              <span>{currentNav.findDoctors}</span>
            </Link>
            <Link to="/surveillance" className="mobile-nav-link">
              <Shield className="nav-icon" />
              <span>{currentNav.surveillance}</span>
            </Link>

            {/* Mobile Language Selector */}
            <div className="mobile-lang-container">
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="mobile-language-select"
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="mobile-auth-container">
              <Link to="/login">
                <button className="mobile-btn mobile-btn-secondary">Login</button>
              </Link>
              <Link to="/register">
                <button className="mobile-btn mobile-btn-primary">Register</button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
