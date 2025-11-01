import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires',
        variant: 'destructive'
      });
      return;
    }

    // TODO: Implement actual form submission
    console.log('Form submitted:', formData);
    toast({
      title: 'Message envoyé !',
      description: 'Nous vous répondrons dans les plus brefs délais.'
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };
  return <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Mail className="w-20 h-20 mx-auto mb-8 animate-float" />
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Nous sommes à votre écoute pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  Informations de Contact
                </h2>
              </div>

              <div className="glass-effect p-6 rounded-xl hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Adresse</h3>
                    <p className="text-muted-foreground">
                      9 Rue de Sully<br />
                      69150 Décines-Charpieu<br />
                      France
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-effect p-6 rounded-xl hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Téléphone</h3>
                    <a href="tel:+33400000000" className="text-muted-foreground hover:text-primary transition-colors">+33 4 72 02 02 88</a>
                  </div>
                </div>
              </div>

              <div className="glass-effect p-6 rounded-xl hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Email</h3>
                    <a href="mailto:contact@mosquee-arrahmane.fr" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@mosquee-arrahmane.fr
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-effect p-6 rounded-xl hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Horaires d'Ouverture</h3>
                    <p className="text-muted-foreground">
                      Ouvert pour les 5 prières quotidiennes<br />
                      Bureau : Lundi - Vendredi, 9h - 17h
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="font-bold text-foreground mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110" aria-label="Facebook">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110" aria-label="Instagram">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110" aria-label="YouTube">
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="glass-effect p-8 rounded-2xl">
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  Envoyez-nous un Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet <span className="text-destructive">*</span>
                    </label>
                    <Input id="name" type="text" value={formData.name} onChange={e => setFormData({
                    ...formData,
                    name: e.target.value
                  })} placeholder="Votre nom" required />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                    ...formData,
                    email: e.target.value
                  })} placeholder="votre@email.com" required />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Téléphone
                    </label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({
                    ...formData,
                    phone: e.target.value
                  })} placeholder="+33 X XX XX XX XX" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea id="message" value={formData.message} onChange={e => setFormData({
                    ...formData,
                    message: e.target.value
                  })} placeholder="Votre message..." rows={6} required />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 w-5 h-5" />
                    Envoyer le Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                Comment Nous Trouver
              </h2>
              <p className="text-lg text-muted-foreground">
                9 Rue de Sully, 69150 Décines-Charpieu
              </p>
            </div>

            <div className="glass-effect p-4 rounded-2xl overflow-hidden">
              <div className="w-full h-96 bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Carte Google Maps</p>
                  <p className="text-sm mt-2">
                    L'intégration de la carte sera bientôt disponible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-12 text-center">
              Questions Fréquentes
            </h2>
            <div className="space-y-4">
              {[{
              q: 'Quels sont les horaires d\'ouverture ?',
              a: 'La mosquée est ouverte pour les 5 prières quotidiennes. Le bureau administratif est ouvert du lundi au vendredi de 9h à 17h.'
            }, {
              q: 'Comment puis-je m\'inscrire aux cours ?',
              a: 'Vous pouvez vous inscrire en nous contactant par téléphone ou email, ou en vous présentant directement à la mosquée.'
            }, {
              q: 'Y a-t-il un parking disponible ?',
              a: 'Oui, un parking est disponible à proximité de la mosquée pour faciliter votre visite.'
            }, {
              q: 'La mosquée est-elle accessible aux personnes à mobilité réduite ?',
              a: 'Oui, nous nous efforçons de rendre notre mosquée accessible à tous. Contactez-nous pour plus de détails.'
            }].map((faq, index) => <div key={index} className="glass-effect p-6 rounded-xl">
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Contact;