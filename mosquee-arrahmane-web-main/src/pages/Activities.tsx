import { BookOpen, Users, Calendar, Clock, UserCheck, MessageCircle, Heart, Trophy } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Activities = () => {
  return <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Calendar className="w-20 h-20 mx-auto mb-8 animate-float" />
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Nos Activités
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Des services et programmes pour toute la communauté
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-foreground mb-12 text-center">
              Services Disponibles
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Prière du Vendredi */}
              <div className="glass-effect p-8 rounded-xl hover-lift">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      Prière du Jumou'a
                    </h3>
                    <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                      Tous les vendredis
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  La prière du vendredi est un moment fort de rassemblement communautaire. Le prêche est délivré en français pour être accessible à tous.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Voir les horaires de la prière Dhuhr</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <UserCheck className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Prêche en français</span>
                  </div>
                </div>
              </div>

              {/* Conférences */}
              <div className="glass-effect p-8 rounded-xl hover-lift">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 flex-shrink-0">
                    <MessageCircle className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">Conférences</h3>
                    <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                      Réguliers
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">Conférences sur divers sujets culturels, éducatifs et spirituels animées par des imams et experts</p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Pour tous les âges</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MessageCircle className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Différents thèmes abordés</span>
                  </div>
                </div>
              </div>

              {/* Cours d'Arabe */}
              <div className="glass-effect p-8 rounded-xl hover-lift">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">Cours d'Arabe et d'éducation islamique</h3>
                    <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                      Hebdomadaires
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">Apprenez la langue arabe et l'islam pour mieux comprendre le Coran et approfondir votre pratique religieuse. Cours pour débutants et niveaux avancés.</p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Enfants et adultes</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BookOpen className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Apprentissage progressif</span>
                  </div>
                </div>
              </div>

              {/* Tarawih */}
              <div className="glass-effect p-8 rounded-xl hover-lift">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 flex-shrink-0">
                    <Calendar className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      Prières de Tarawih
                    </h3>
                    <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                      Durant Ramadan
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Pendant le mois béni de Ramadan, rejoignez-nous pour les prières de Tarawih après la prière d'Isha. Un moment spirituel fort de la communauté.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Après la prière d'Isha</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Tous les soirs du mois</span>
                  </div>
                </div>
              </div>

              {/* Événements sportifs */}
              <div className="glass-effect p-8 rounded-xl hover-lift">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 flex-shrink-0">
                    <Trophy className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      Événements sportifs
                    </h3>
                    <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                      Ponctuels
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Organisation d'activités sportives pour renforcer la cohésion et promouvoir un mode de vie sain au sein de la communauté
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Pour toute la communauté</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Trophy className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Esprit d'équipe et fraternité</span>
                  </div>
                </div>
              </div>

              {/* Maraude et bénévolat */}
              <div className="glass-effect p-8 rounded-xl hover-lift">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-4 flex-shrink-0">
                    <Heart className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      Maraude et bénévolat
                    </h3>
                    <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                      Réguliers
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Actions de solidarité et d'aide aux plus démunis, avec la participation active de nos bénévoles pour servir la communauté
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Heart className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Entraide et solidarité</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-primary mr-2" />
                    <span className="text-muted-foreground">Rejoignez nos équipes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Women's Space */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect p-8 md:p-12 rounded-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Espace Dédié aux Femmes
                </h2>
              </div>
              <p className="text-lg text-muted-foreground text-center mb-6 leading-relaxed">
                La Mosquée Ar-Rahmane dispose d'une salle de prière entièrement dédiée aux femmes, avec des ablutions séparées. Cet espace a été conçu pour offrir confort et sérénité à toutes nos sœurs.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Salle de prière indépendante</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Ablutions dédiées</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Espace confortable et climatisé</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">Accessible pour toutes les prières</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Rejoignez Notre Communauté
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Pour plus d'informations sur nos activités, nos horaires de cours ou pour vous inscrire, n'hésitez pas à nous contacter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="default">
                  Nous Contacter
                </Button>
              </Link>
              <Link to="/prieres">
                <Button size="lg" variant="outline">
                  Voir les Horaires
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Activities;