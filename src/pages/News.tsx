import { Calendar, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: 'Début du mois de Ramadan 1446',
      date: '2025-03-01',
      category: 'Annonce',
      excerpt: 'Le mois béni de Ramadan débutera incha\'Allah le samedi 1er mars 2025. Les prières de Tarawih seront organisées tous les soirs.',
      content: 'Plus de détails à venir...',
    },
    {
      id: 2,
      title: 'Nouveaux cours d\'arabe pour enfants',
      date: '2025-02-15',
      category: 'Éducation',
      excerpt: 'La mosquée lance de nouveaux cours d\'arabe spécialement conçus pour les enfants de 6 à 12 ans.',
      content: 'Inscriptions ouvertes...',
    },
    {
      id: 3,
      title: 'Collecte pour la rénovation de la mosquée',
      date: '2025-02-01',
      category: 'Projet',
      excerpt: 'Lancement d\'une collecte de fonds pour la rénovation et l\'amélioration des installations de la mosquée.',
      content: 'Détails du projet...',
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
            <Calendar className="w-20 h-20 mx-auto mb-8 animate-float" />
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Actualités
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Restez informés des dernières nouvelles de la mosquée
            </p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {newsArticles.map((article) => (
                <article key={article.id} className="glass-effect p-8 rounded-2xl hover-lift">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {article.title}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>
                </article>
              ))}
            </div>

            {/* Coming Soon Message */}
            <div className="mt-12 text-center glass-effect p-12 rounded-2xl">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Plus d'actualités à venir
              </h3>
              <p className="text-muted-foreground">
                Cette section sera régulièrement mise à jour avec les dernières nouvelles et événements de la mosquée.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
