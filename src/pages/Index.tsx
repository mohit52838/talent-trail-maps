import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Target, Map, BookOpen, ArrowRight, Sparkles, Briefcase, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import heroImage from "@/assets/hero-career.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { loadJourneyData, updateJourneyData } from "@/lib/journey";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<"10th" | "12th" | "">("");
  const [pendingGrade, setPendingGrade] = useState<"10th" | "12th" | "">("");
  const [hasStartedJourney, setHasStartedJourney] = useState(false);
  const [isGradeSelectionOpen, setIsGradeSelectionOpen] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);
  const [postGradeAction, setPostGradeAction] = useState<"test" | null>(null);

  useEffect(() => {
    const savedLevel = localStorage.getItem('qualificationLevel');
    if (savedLevel === '10th' || savedLevel === '12th') {
      setSelectedGrade(savedLevel as "10th" | "12th");
      setPendingGrade(savedLevel as "10th" | "12th");
      setHasStartedJourney(true);
    }

    const started = localStorage.getItem('hasStartedJourney') === 'true';
    if (started) {
      setHasStartedJourney(true);
    }

    const journey = loadJourneyData();
    if (journey.grade && (journey.grade === '10th' || journey.grade === '12th')) {
      setSelectedGrade(journey.grade);
      setPendingGrade(journey.grade);
    }
    if (journey.category) {
      setPendingCategory(journey.category);
    }
  }, []);


  const gradeLabels = useMemo(() => ({
    "10th": "Grade 10",
    "12th": "Grade 12",
  } as const), []);

  const handleQualificationSubmit = () => {
    if (!pendingGrade) {
      toast({
        title: "Please select an option",
        description: "Choose your current qualification level to continue",
        variant: "destructive",
      });
      return;
    }

    setSelectedGrade(pendingGrade);
    localStorage.setItem('qualificationLevel', pendingGrade);
    localStorage.setItem('hasStartedJourney', 'true');
    updateJourneyData({ grade: pendingGrade });
    setIsGradeSelectionOpen(false);
    toast({
      title: "Grade saved",
      description: `You're now viewing recommendations for ${gradeLabels[pendingGrade]}.`
    });

    if (postGradeAction === 'test') {
      if (pendingCategory) {
        updateJourneyData({ category: pendingCategory });
        navigate('/test', { state: { category: pendingCategory } });
        setPendingCategory(null);
      } else {
        navigate('/test');
      }
    }

    setPostGradeAction(null);
  };

  const handleGetStarted = () => {
    if (!hasStartedJourney) {
      setHasStartedJourney(true);
      localStorage.setItem('hasStartedJourney', 'true');
    }
    setPendingGrade(selectedGrade || "");
    setPendingCategory(null);
    setPostGradeAction(null);
    setIsGradeSelectionOpen(true);
  };


  return (
    <div className="min-h-screen">
      <Navbar />
      {isGradeSelectionOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-2xl" role="dialog" aria-modal="true">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-primary to-secondary">
                  <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold">Let’s Personalize Your Plan</CardTitle>
              <CardDescription className="text-base sm:text-lg px-2">
                Tell us where you are in your learning journey so we can tailor career paths just for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 sm:p-6">
              <RadioGroup value={pendingGrade} onValueChange={(value: any) => setPendingGrade(value)}>
                <div className="flex items-center space-x-3 p-4 sm:p-6 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="10th" id="10th" />
                  <Label htmlFor="10th" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-base sm:text-lg">Currently in 10th Grade</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Discover foundational roadmaps, streams, and skills to explore right now.</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 sm:p-6 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="12th" id="12th" />
                  <Label htmlFor="12th" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-base sm:text-lg">Currently in 12th Grade</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Get exam prep, entrance guidance, and higher education planning aligned to your goals.</div>
                  </Label>
                </div>
              </RadioGroup>
              <Button size="lg" className="w-full" onClick={handleQualificationSubmit}>
                Save & Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      <main id="main">
      {/* Hero Section */}
      <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Career guidance visualization" 
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/80" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center text-white space-y-6 sm:space-y-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-sm">
              <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight px-4">
            Your Future Starts Here
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl max-w-4xl mx-auto text-white/95 px-4 font-light">
            AI-powered career guidance combining personality insights with personalized roadmaps to help you achieve your dream career
          </p>
          {!hasStartedJourney && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 sm:pt-8 px-4">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto text-lg px-8 py-6"
              >
                {user ? "Start Your Journey" : "Get Started Free"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">Your Career Journey in Four Steps</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how our platform guides you from assessment to your personalized career roadmap
            </p>
            <Button size="lg" variant="outline" onClick={() => navigate("/how-it-works")} className="text-lg">
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 cursor-pointer" onClick={() => navigate("/how-it-works")}>
              <CardHeader className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">Qualification Check</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Tell us your educational background
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 cursor-pointer" onClick={() => navigate("/how-it-works")}>
              <CardHeader className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-secondary/10 w-20 h-20 flex items-center justify-center">
                    <Target className="w-10 h-10 text-secondary" />
                  </div>
                </div>
                <CardTitle className="text-xl">Personality Test</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  MBTI-based assessment
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 cursor-pointer" onClick={() => navigate("/how-it-works")}>
              <CardHeader className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-accent/10 w-20 h-20 flex items-center justify-center">
                    <Map className="w-10 h-10 text-accent" />
                  </div>
                </div>
                <CardTitle className="text-xl">Career Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Personalized timeline with milestones
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 cursor-pointer" onClick={() => navigate("/how-it-works")}>
              <CardHeader className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">Course Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Direct links to relevant courses
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 md:py-32 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Explore Our Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to discover and plan your career path
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 cursor-pointer" onClick={() => navigate("/career-paths")}>
              <CardHeader className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center">
                    <Briefcase className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Career Paths</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  Explore diverse career opportunities across technology, business, creative arts, and healthcare
                </CardDescription>
                <Button variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); navigate("/career-paths"); }}>
                  Explore
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 cursor-pointer" onClick={() => navigate("/fun-tools")}>
              <CardHeader className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-secondary/10 w-20 h-20 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-secondary" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Fun Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  Discover your career personality through interactive quizzes and games
                </CardDescription>
                <Button variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); navigate("/fun-tools"); }}>
                  Try Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 cursor-pointer" onClick={() => navigate("/faq")}>
              <CardHeader className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-accent/10 w-20 h-20 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-accent" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  Find answers to common questions about our platform and career guidance
                </CardDescription>
                <Button variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); navigate("/faq"); }}>
                  View FAQ
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Start Your Journey?</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards your dream career with our AI-powered guidance platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <Button size="lg" onClick={() => navigate("/auth")} className="text-lg px-8 py-6">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button size="lg" onClick={() => navigate("/test")} className="text-lg px-8 py-6">
                Continue Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
            <Button size="lg" variant="outline" onClick={() => navigate("/contact")} className="text-lg px-8 py-6">
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Talent Trail Maps</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered career guidance to help you discover your dream career path.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div><Link to="/test" className="text-muted-foreground hover:text-primary transition-colors">Take Quiz</Link></div>
                <div><Link to="/career-paths" className="text-muted-foreground hover:text-primary transition-colors">Career Paths</Link></div>
                <div><Link to="/fun-tools" className="text-muted-foreground hover:text-primary transition-colors">Fun Tools</Link></div>
                <div><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm">
                <div><Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></div>
                <div><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></div>
                <div><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-sm text-muted-foreground">
                Have questions? Reach out to us through our contact form.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 Talent Trail Maps. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
};

export default Index;
