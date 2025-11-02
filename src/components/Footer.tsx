import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import logoCid from '@/assets/logo-cid.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logoCid} alt="Logo CID" className="w-8 h-8" />
              <h3 className="font-display text-xl font-bold">Mosquée Ar-Rahmane</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Un lieu de prière, d'apprentissage et de fraternité au cœur de Décines-Charpieu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/prieres" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Horaires des Prières
                </Link>
              </li>
              <li>
                <Link to="/activites" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Nos Activités
                </Link>
              </li>
              <li>
                <Link to="/apropos" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Nous Contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  9 Rue de Sully<br />69150 Décines-Charpieu
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+33400000000" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">+33 4 72 02 02 88 / +33 6 16 46 19 79</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact@lecid.net" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">contact@lecid.net</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.facebook.com/LeCid2" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-all hover:scale-110" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/mosquee_de_decines/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-all hover:scale-110" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@cidecines3561" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-all hover:scale-110" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://chat.whatsapp.com/JWqll01fCqBBmu2X769MtM" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-all hover:scale-110" aria-label="WhatsApp Groupe">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <Link to="/dons">
                <button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2 px-4 rounded-lg font-medium transition-colors text-sm">
                  Faire un Don
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="text-center text-primary-foreground/60 text-sm">
            <p>&copy; {currentYear} Mosquée Ar-Rahmane. Tous droits réservés.</p>
            <p className="mt-2">
              
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;