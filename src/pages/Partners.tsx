import { Heart, Users, BookOpen, GraduationCap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Partners = () => {
  const institutionalPartners = [
    {
      name: 'Al Kindi',
      icon: GraduationCap,
      description: "Sous contrat avec l'État et ouvert à tous, Al Kindi accueille des élèves de la CP à la Terminale de toute la région lyonnaise et bien plus encore. C'est conjointement que le corps enseignant, le personnel, les familles, et les élèves, travaillent à construire un espace d'éducation et de Savoir.",
      type: 'Éducation',
    },
    {
      name: 'Chrysalead',
      icon: Users,
      description: "Chrysalead est une association dévouée qui agit dans plusieurs domaines pour contribuer au bien-être de la communauté, par le biais de l'humanitaire, du soutien aux femmes, de l'accompagnement des jeunes ou de l'organisation d'événements.",
      type: 'Communautaire',
    },
  ];

  const associativePartners = [
    {
      name: 'Zakat France',
      icon: Heart,
      description: 'Zakat France est un fonds de dotation créé en 2011, qui collecte et reverse les dons aux familles',
      type: 'Solidarité',
    },
    {
      name: 'Human Appeal',
      icon: Heart,
      description: "Human Appeal est une organisation à but non lucratif qui travaille dans le monde entier pour renforcer la lutte de l'humanité contre la pauvreté, l'injustice sociale et les catastrophes naturelles.",
      type: 'Humanitaire',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Users className="w-20 h-20 mx-auto mb-8 animate-float" />
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Nos Partenaires
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Ensemble pour servir la communauté et construire un avenir meilleur
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Partners */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                Partenaires Institutionnels
              </h2>
              <p className="text-lg text-muted-foreground">
                Des institutions engagées pour l'éducation et le développement communautaire
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {institutionalPartners.map((partner, index) => (
                <div key={index} className="glass-effect p-8 rounded-xl hover-lift">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 flex-shrink-0">
                      <partner.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        {partner.name}
                      </h3>
                      <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                        {partner.type}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Associative Partners */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                Partenaires Associatifs
              </h2>
              <p className="text-lg text-muted-foreground">
                Des organisations humanitaires au service des plus démunis
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {associativePartners.map((partner, index) => (
                <div key={index} className="glass-effect p-8 rounded-xl hover-lift">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 flex-shrink-0">
                      <partner.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        {partner.name}
                      </h3>
                      <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                        {partner.type}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect p-12 rounded-2xl text-center">
              <Heart className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Devenir Partenaire
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Vous souhaitez collaborer avec la Mosquée Ar-Rahmane pour servir la communauté ? 
                Contactez-nous pour explorer les possibilités de partenariat.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-strong transition-all hover:scale-105"
              >
                Nous Contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;