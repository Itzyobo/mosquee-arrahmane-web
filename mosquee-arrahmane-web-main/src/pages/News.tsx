import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const News = () => {
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.sheety.co/081e9cf1a69c44c55df8cb87d1baab84/annoncemosquee/feuille1')
      .then((res) => res.json())
      .then((data) => {
        if (data.feuille1) {
          const articles = data.feuille1.map((item: any) => ({
            id: item.id,
            title: item.titre,
            excerpt: item.description,
            date: item.date,
            category: item["typeD'annonce"] || 'Annonce',
          })).reverse();
          setNewsArticles(articles);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

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
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Chargement des actualités...</p>
              </div>
            ) : (
              <div className="space-y-8">
                {newsArticles.length > 0 ? (
                  newsArticles.map((article) => (
                    <article key={article.id} className="glass-effect p-8 rounded-2xl hover-lift">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(article.date)}
                        </div>
                      </div>
                      
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {article.title}
                      </h2>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {article.excerpt}
                      </p>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-12 glass-effect rounded-2xl">
                    <p className="text-muted-foreground">Aucune actualité pour le moment.</p>
                  </div>
                )}
              </div>
            )}

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
