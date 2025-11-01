import { MapPin, Users, Book, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import communityImage from '@/assets/community.jpg';
const About = () => {
  return <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              À Propos de Nous
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Un lieu de foi, d'apprentissage et de fraternité au cœur de Décines-Charpieu
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                La Mosquée Ar-Rahmane est bien plus qu'un simple lieu de prière. C'est un centre communautaire qui rassemble les fidèles autour des valeurs islamiques de paix, de fraternité et d'apprentissage.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Nous nous engageons à offrir un espace accueillant pour tous, où chacun peut pratiquer sa foi, approfondir ses connaissances religieuses et tisser des liens fraternels avec la communauté.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-effect p-4 rounded-lg text-center">
                  <div className="text-4xl font-bold text-primary mb-2">750</div>
                  <div className="text-sm text-muted-foreground">Capacité (places)</div>
                </div>
                <div className="glass-effect p-4 rounded-lg text-center">
                  <div className="text-4xl font-bold text-primary mb-2">400m²</div>
                  <div className="text-sm text-muted-foreground">Surface totale</div>
                </div>
              </div>
            </div>
            <div>
              <img src={communityImage} alt="Communauté de la mosquée" className="rounded-2xl shadow-strong hover-lift" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-muted-foreground">
              Les piliers qui guident notre action quotidienne
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[{
            icon: Heart,
            title: 'Fraternité',
            description: 'Créer des liens forts entre les membres de la communauté musulmane'
          }, {
            icon: Book,
            title: 'Apprentissage',
            description: 'Transmettre les enseignements de l\'Islam avec sagesse et pédagogie'
          }, {
            icon: Users,
            title: 'Inclusion',
            description: 'Accueillir tous les fidèles dans un esprit d\'ouverture et de respect'
          }, {
            icon: MapPin,
            title: 'Ancrage Local',
            description: 'Être un pilier de la communauté musulmane de Décines-Charpieu'
          }].map((value, index) => <div key={index} className="glass-effect p-6 rounded-xl hover-lift group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-12 text-center">
              Nos Installations
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-effect p-8 rounded-xl">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  Salles de Prière
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Une salle de prière principale pour les hommes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Une salle de prière dédiée aux femmes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Capacité totale de plus de 3000 places</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Espaces climatisés et confortables</span>
                  </li>
                </ul>
              </div>

              <div className="glass-effect p-8 rounded-xl">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  Salles d'Ablutions
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Une salle d'ablutions pour les hommes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Une salle d'ablutions pour les femmes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Installations modernes et bien entretenues</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Accessibilité pour tous</span>
                  </li>
                </ul>
              </div>

              <div className="glass-effect p-8 rounded-xl">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Book className="w-5 h-5 text-primary" />
                  </div>
                  Espaces Éducatifs
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Salles dédiées aux cours d'Islam</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Salles pour les cours d'Arabe</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Bibliothèque islamique</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Espaces adaptés pour les enfants</span>
                  </li>
                </ul>
              </div>

              <div className="glass-effect p-8 rounded-xl">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  Services Proposés
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Prière du Jumou'a (Vendredi)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Prêche en français</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Prières de Tarawih (Ramadan)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span>Cours réguliers d'Islam et d'Arabe</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">
                Nous Trouver
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                9 Rue de Sully, 69150 Décines-Charpieu
              </p>
              <p className="text-muted-foreground">
                À proximité du centre-ville, facilement accessible en transport en commun
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

      <Footer />
    </div>;
};
export default About;