import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ExternalLink, BookOpen, Clock, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { findCareerById, loadJourneyData } from "@/lib/journey";

const Roadmap = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const careerId = searchParams.get("career");
  const [loading, setLoading] = useState(true);
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);

  useEffect(() => {
    const journey = loadJourneyData();
    const targetCareer = careerId || journey.lastCareerId;

    if (!targetCareer) {
      toast({
        title: "Choose a career",
        description: "Select a career from your results to view the roadmap.",
      });
      navigate('/results');
      return;
    }

    setSelectedCareerId(targetCareer);
    setLoading(false);
  }, [careerId, navigate, toast]);

  const details = useMemo(() => {
    if (!selectedCareerId) return null;
    return findCareerById(selectedCareerId);
  }, [selectedCareerId]);

  const handleCourseClick = (url: string) => {
    window.open(url, "_blank", "noopener noreferrer");
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
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Your Career Roadmap
          </h1>
          {details?.career ? (
            <>
              <h2 className="text-2xl font-semibold text-foreground">{details.career.name}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {details.career.description}
              </p>
              {details.career.growthOutlook && (
                <Badge variant="secondary" className="text-base px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  Growth Outlook: {details.career.growthOutlook}
                </Badge>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">We couldn't find that career. Pick another from your results.</p>
          )}
        </div>

        {details?.career && (
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

            <div className="space-y-8">
              {details.career.roadmap.map((stage) => (
                <div key={stage.stage} className="relative">
                  <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-primary border-4 border-background hidden md:block z-10" />

                  <Card className="md:ml-16 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">Stage {stage.stage}</Badge>
                            <Badge>{stage.level}</Badge>
                          </div>
                          <CardTitle className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            {stage.title}
                          </CardTitle>
                          <CardDescription className="mt-2">{stage.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>{stage.platform}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{stage.duration}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full sm:w-auto"
                        onClick={() => handleCourseClick(stage.courseUrl)}
                      >
                        View Course
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Start with the first course and work your way through the roadmap at your own pace.
              Each course builds upon the previous one to help you achieve your career goals.
            </p>
            <Button variant="outline" onClick={() => navigate("/results")}>
              Explore Other Careers
            </Button>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
