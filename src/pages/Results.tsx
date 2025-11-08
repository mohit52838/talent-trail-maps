import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, Target, TrendingUp, Users, Building, BookOpen, ExternalLink, Clock, Award, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CAREER_CATEGORIES, computePersonalityType, findCategoryById, loadJourneyData, updateJourneyData } from "@/lib/journey";
import { getCoursesByCategory } from "@/lib/courses";

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<string>("tech");
  const [personalityType, setPersonalityType] = useState("");

  const category = useMemo(() => findCategoryById(categoryId), [categoryId]);
  const careerPaths = category?.careers ?? [];
  const recommendedCourses = useMemo(() => getCoursesByCategory(categoryId), [categoryId]);

  useEffect(() => {
    const journey = loadJourneyData();

    if (!journey.testAnswers || Object.keys(journey.testAnswers).length === 0) {
      toast({
        title: "Take the assessment",
        description: "Complete the career assessment to see personalized results.",
      });
      navigate('/test');
      return;
    }

    const derivedPersonality = journey.personalityType || computePersonalityType(journey.testAnswers);
    setPersonalityType(derivedPersonality);

    const storedCategory = journey.category || "tech";
    setCategoryId(storedCategory);

    updateJourneyData({
      personalityType: derivedPersonality,
      category: storedCategory,
    });

    setLoading(false);
  }, [navigate, toast]);

  const handleSelectCareer = (careerId: string) => {
    updateJourneyData({ lastCareerId: careerId });
    navigate(`/success-criteria?career=${careerId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      <div className="container py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">

          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Your Personality Type: {personalityType || "--"}
            </Badge>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Your Career Matches
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on your answers and interests, here are curated career paths to explore next.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {CAREER_CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  variant={cat.id === categoryId ? "default" : "outline"}
                  onClick={() => {
                    setCategoryId(cat.id);
                    updateJourneyData({ category: cat.id });
                  }}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {careerPaths.map((career) => (
              <Card key={career.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-start gap-2">
                    <Target className="w-5 h-5 text-primary mt-1" />
                    {career.name}
                  </CardTitle>
                  <CardDescription>{career.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold mb-1">Expected Salary</p>
                        <p className="text-muted-foreground">{career.salaryRange}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold mb-1">Job Prospects</p>
                        <p className="text-muted-foreground">{career.jobProspects}</p>
                      </div>
                    </div>

                    {career.growthOutlook && (
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold mb-1">Market Demand</p>
                          <Badge variant="secondary">{career.growthOutlook}</Badge>
                        </div>
                      </div>
                    )}

                    {career.industries && career.industries.length > 0 && (
                      <div className="flex items-start gap-3">
                        <Building className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold mb-1">Industries</p>
                          <p className="text-sm text-muted-foreground">
                            {career.industries.slice(0, 3).join(', ')}
                          </p>
                        </div>
                      </div>
                    )}

                    {career.skills.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-2">Key Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.slice(0, 5).map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full mt-4"
                    onClick={() => handleSelectCareer(career.id)}
                  >
                    Explore This Path
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {careerPaths.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                We're preparing more personalized recommendations. Check back soon!
              </p>
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </Card>
          )}

          {/* Recommended Courses Section */}
          {recommendedCourses.length > 0 && (
            <div className="space-y-6 mt-16">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Recommended Courses
                </h2>
                <p className="text-lg text-muted-foreground">
                  Start learning with these curated courses for {category?.label || "your selected category"}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendedCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{course.category}</Badge>
                        <Badge variant="outline">{course.level.split(' ')[0]}</Badge>
                      </div>
                      <CardTitle className="flex items-start gap-2">
                        <BookOpen className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span>{course.name}</span>
                      </CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <GraduationCap className="w-4 h-4" />
                          <span>{course.eligibility}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Award className="w-4 h-4" />
                          <span>{course.colleges.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => window.open(course.link, '_blank')}
                      >
                        Explore Course
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
