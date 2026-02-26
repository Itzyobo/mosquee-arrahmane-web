import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PushNotificationButton } from '@/components/PushNotificationButton';
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    to: '/',
    label: 'Accueil'
  }, {
    to: '/prieres',
    label: 'Horaires'
  }, {
    to: '/apropos',
    label: 'À Propos'
  }, {
    to: '/activites',
    label: 'Activités'
  }, {
    to: '/actualites',
    label: 'Actualités'
  }, {
    to: '/partenaires',
    label: 'Partenaires'
  }, {
    to: '/contact',
    label: 'Contact'
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-card/95 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-display font-bold text-foreground">Mosquée Ar-Rahman</h1>
            <p className="text-xs text-muted-foreground">Décines-Charpieu</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map(link => <Link key={link.to} to={link.to} className={`px-4 py-2 rounded-lg font-medium transition-all hover:bg-muted ${location.pathname === link.to ? 'text-primary bg-muted' : 'text-foreground'}`}>
            {link.label}
          </Link>)}
          <PushNotificationButton />
          <Link to="/dons">
            <Button variant="default" size="default" className="ml-4">
              Faire un Don
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Toggle menu">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && <div className="lg:hidden py-4 border-t border-border animate-fade-in">
        <div className="flex flex-col space-y-2">
          {navLinks.map(link => <Link key={link.to} to={link.to} onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-3 rounded-lg font-medium transition-all ${location.pathname === link.to ? 'text-primary bg-muted' : 'text-foreground hover:bg-muted'}`}>
            {link.label}
          </Link>)}
          <div className="flex items-center justify-between mt-2">
            <PushNotificationButton />
            <Link to="/dons" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 ml-2">
              <Button variant="default" size="default" className="w-full">
                Faire un Don
              </Button>
            </Link>
          </div>
        </div>
      </div>}
    </div>
  </nav>;
};
export default Navigation;