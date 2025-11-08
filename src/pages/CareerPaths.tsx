import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Briefcase, Palette, TrendingUp, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { updateJourneyData } from "@/lib/journey";

const CareerPaths = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleExploreCategory = (categoryId: string) => {
    updateJourneyData({ category: categoryId });
    if (user) {
      navigate('/test', { state: { category: categoryId } });
    } else {
      navigate('/auth');
    }
  };

  const categories = [
    {
      id: 'tech',
      icon: Code,
      title: 'Technology & IT',
      description: 'Software development, data science, cybersecurity, cloud computing, and AI/ML engineering',
      bgClass: 'bg-primary/10',
      iconClass: 'text-primary'
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business & Finance',
      description: 'Management consulting, financial analysis, entrepreneurship, marketing, and investment banking',
      bgClass: 'bg-secondary/10',
      iconClass: 'text-secondary'
    },
    {
      id: 'creative',
      icon: Palette,
      title: 'Creative Arts',
      description: 'Graphic design, content creation, animation, photography, music production, and digital art',
      bgClass: 'bg-accent/10',
      iconClass: 'text-accent'
    },
    {
      id: 'health',
      icon: TrendingUp,
      title: 'Healthcare & Science',
      description: 'Medicine, nursing, research, biotechnology, psychology, and pharmaceutical sciences',
      bgClass: 'bg-primary/10',
      iconClass: 'text-primary'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      <main className="container py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Back to Home Button */}
          <div className="flex justify-start">
            <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Explore Career Paths
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Discover diverse career opportunities across various fields and industries
            </p>
          </div>

          {/* Career Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 group"
                >
                  <CardHeader className="space-y-6 pb-6">
                    <div className="flex justify-center">
                      <div className={`p-5 rounded-full ${category.bgClass} w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-12 h-12 ${category.iconClass}`} />
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-center">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <CardDescription className="text-base leading-relaxed min-h-[60px]">
                      {category.description}
                    </CardDescription>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" 
                      onClick={() => handleExploreCategory(category.id)}
                    >
                      Explore Path
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Info Section */}
          <div className="bg-muted/50 rounded-2xl p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">Not Sure Where to Start?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take our personality assessment to discover which career paths align best with your interests and strengths.
            </p>
            <Button size="lg" onClick={() => navigate('/test')} className="text-lg px-8">
              Take Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerPaths;

