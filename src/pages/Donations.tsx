import { useState } from 'react';
import { Heart, TrendingUp, Users, Building } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import donationImage from '@/assets/donation.jpg';

const Donations = () => {
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(50);

  const suggestedAmounts = [10, 25, 50, 100, 200];

  const handleDonate = (amount: number) => {
    // TODO: Integrate with PayPal
    console.log('Donation amount:', amount);
    alert(`Merci pour votre don de ${amount}€. L'intégration PayPal sera bientôt disponible.`);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Hadith */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${donationImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-secondary/90 to-accent/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-20 h-20 mx-auto mb-8 text-primary-foreground animate-float" />
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-8">
              Faire un Don
            </h1>

            {/* Hadith - Featured */}
            <div className="glass-effect p-8 md:p-12 rounded-2xl mb-8">
              <div className="mb-4">
                <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-6" />
              </div>
              <blockquote className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground leading-relaxed mb-6">
                « Une aumône n'a jamais diminué un bien, Allah n'ajoute que fierté à un serviteur qui pardonne et personne ne se montre humble pour Allah sans qu'Allah n'élève son rang. »
              </blockquote>
              <cite className="text-lg text-primary-foreground/80 not-italic">
                [Authentique] - [Rapporté par Muslim] - [Sahih Muslim - 2588]
              </cite>
              <div className="w-16 h-1 bg-accent mx-auto rounded-full mt-6" />
            </div>

            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Votre générosité permet à la mosquée de continuer à servir la communauté
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="glass-effect p-8 md:p-12 rounded-2xl">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Choisissez votre don
              </h2>

              {/* Suggested Amounts */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {suggestedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`p-4 rounded-xl font-bold text-xl transition-all hover-lift ${
                      selectedAmount === amount && !customAmount
                        ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {amount}€
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Ou entrez un montant personnalisé
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    placeholder="Montant personnalisé"
                    className="text-xl py-6 pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">
                    €
                  </span>
                </div>
              </div>

              {/* Donate Button */}
              <Button
                size="lg"
                onClick={() => handleDonate(customAmount ? parseFloat(customAmount) : selectedAmount)}
                className="w-full text-lg py-6"
              >
                <Heart className="mr-2 w-5 h-5" />
                Faire un don de {customAmount || selectedAmount}€
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-6">
                Paiement sécurisé via PayPal • Don unique
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Projets à Financer
            </h2>
            <p className="text-lg text-muted-foreground">
              Votre contribution aide à réaliser ces projets importants
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Building,
                title: 'Rénovation de la Mosquée',
                description: 'Amélioration des installations et de l\'accessibilité',
                progress: 65,
                goal: '50,000€',
              },
              {
                icon: Users,
                title: 'Programmes Éducatifs',
                description: 'Cours d\'Islam et d\'Arabe pour tous les âges',
                progress: 80,
                goal: '15,000€',
              },
              {
                icon: Heart,
                title: 'Actions Caritatives',
                description: 'Aide aux familles dans le besoin',
                progress: 45,
                goal: '20,000€',
              },
            ].map((project, index) => (
              <div key={index} className="glass-effect p-6 rounded-xl hover-lift">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <project.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progression</span>
                    <span className="font-semibold text-primary">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Objectif : <span className="font-semibold text-foreground">{project.goal}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-8 text-center">
              Pourquoi Donner ?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-effect p-6 rounded-xl">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Impact Durable
                </h3>
                <p className="text-muted-foreground">
                  Chaque don contribue au développement de la mosquée et au bien-être de la communauté pour les générations futures.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <Heart className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Récompense Spirituelle
                </h3>
                <p className="text-muted-foreground">
                  Le don (Sadaqa) est un acte de foi qui purifie les biens et rapproche d'Allah. C'est un investissement pour l'au-delà.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Soutien Communautaire
                </h3>
                <p className="text-muted-foreground">
                  Vos dons permettent d'offrir des cours gratuits, d'organiser des événements et d'aider les familles en difficulté.
                </p>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <Building className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Entretien du Lieu
                </h3>
                <p className="text-muted-foreground">
                  Les dons assurent l'entretien, la propreté et l'amélioration continue de la mosquée pour tous les fidèles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-12 text-center">
              Questions Fréquentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Puis-je obtenir un reçu fiscal ?',
                  a: 'Oui, tous les dons donnent droit à un reçu fiscal. Contactez-nous pour en faire la demande.',
                },
                {
                  q: 'Comment est utilisé mon don ?',
                  a: 'Tous les dons sont utilisés pour l\'entretien de la mosquée, les programmes éducatifs et les actions caritatives.',
                },
                {
                  q: 'Puis-je faire un don récurrent ?',
                  a: 'Cette option sera bientôt disponible. Pour l\'instant, les dons sont ponctuels.',
                },
                {
                  q: 'Le don est-il sécurisé ?',
                  a: 'Oui, tous les paiements sont sécurisés via PayPal, une plateforme de paiement reconnue et fiable.',
                },
              ].map((faq, index) => (
                <div key={index} className="glass-effect p-6 rounded-xl">
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donations;
