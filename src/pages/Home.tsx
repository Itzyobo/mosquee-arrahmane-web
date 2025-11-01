import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PrayerCard from '@/components/PrayerCard';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import heroImage from '@/assets/mosque-hero.jpg';
import communityImage from '@/assets/community.jpg';
const Home = () => {
  const {
    prayerTimes,
    loading
  } = usePrayerTimes();
  return <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Mosquée Ar-Rahmane
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 animate-fade-in-up" style={{
          animationDelay: '0.2s'
        }}>
            Un lieu de foi, d'apprentissage et de fraternité
          </p>
          <p className="text-lg text-primary-foreground/80 mb-8 animate-fade-in-up" style={{
          animationDelay: '0.3s'
        }}>
            9 Rue de Sully, 69150 Décines-Charpieu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{
          animationDelay: '0.4s'
        }}>
            <Link to="/prieres">
              <Button size="lg" variant="default" className="text-lg px-8">
                Voir les Horaires
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/dons">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Heart className="mr-2 w-5 h-5" />
                Faire un Don
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex justify-center p-2">
            <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Prayer Times Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30 islamic-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Horaires des Prières
            </h2>
            <p className="text-lg text-muted-foreground">
              {loading ? 'Chargement...' : prayerTimes?.gregorianDate}
            </p>
            {prayerTimes && <p className="text-sm text-muted-foreground mt-2">
                {prayerTimes.hijriDate}
              </p>}
          </div>

          {loading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />)}
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {prayerTimes?.prayers.map(prayer => <PrayerCard key={prayer.name} name={prayer.name} adhan={prayer.adhan} iqama={prayer.iqama} isNext={prayer.name === prayerTimes.nextPrayer} />)}
            </div>}

          <div className="text-center mt-8">
            <Link to="/prieres">
              <Button variant="outline" size="lg">
                Voir le Calendrier Complet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Bienvenue à la Mosquée Ar-Rahmane
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">Située au cœur de Décines-Charpieu, la Mosquée Ar-Rahmane est un lieu de prière et de rassemblement pour la communauté musulmane. Avec une capacité de plus de 3000 places et une surface de 2430 m², nous accueillons nos fidèles dans un cadre paisible et accueillant.</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-effect p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">3000</div>
                  <div className="text-sm text-muted-foreground">Places</div>
                </div>
                <div className="glass-effect p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">2430m²</div>
                  <div className="text-sm text-muted-foreground">Surface</div>
                </div>
              </div>
              <Link to="/apropos">
                <Button size="lg" variant="default">
                  En Savoir Plus
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative animate-fade-in">
              <img src={communityImage} alt="Communauté de la mosquée" className="rounded-2xl shadow-strong hover-lift" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nos Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Des activités pour toute la communauté
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
            icon: BookOpen,
            title: 'Cours d\'Islam',
            description: 'Approfondissez votre connaissance de la religion'
          }, {
            icon: BookOpen,
            title: 'Cours d\'Arabe',
            description: 'Apprenez la langue du Coran'
          }, {
            icon: Users,
            title: 'Prière du Vendredi',
            description: 'Prêche en français tous les vendredis'
          }, {
            icon: Calendar,
            title: 'Tarawih (Ramadan)',
            description: 'Prières spéciales durant le mois sacré'
          }].map((service, index) => <div key={index} className="glass-effect p-6 rounded-xl hover-lift group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>)}
          </div>

          <div className="text-center mt-8">
            <Link to="/activites">
              <Button variant="outline" size="lg">
                Découvrir Toutes nos Activités
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-10 islamic-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Soutenez Votre Mosquée
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Votre générosité permet à la mosquée de continuer à servir la communauté et d'offrir des services de qualité à tous.
            </p>
            <Link to="/dons">
              <Button size="lg" variant="default" className="text-lg px-8">
                <Heart className="mr-2 w-5 h-5" />
                Faire un Don
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Home;