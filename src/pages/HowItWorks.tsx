import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Target, Map, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      <main className="container py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              How It Works
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Four simple steps to discover your ideal career path
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Qualification Check</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  Tell us your educational background to get tailored recommendations
                </CardDescription>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our AI validates your board, stream, and recent scores to identify realistic pathways you can pursue today, highlighting gaps and bridge options if needed.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-secondary/10 w-20 h-20 flex items-center justify-center">
                    <Target className="w-10 h-10 text-secondary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Personality Test</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  MBTI-based assessment to understand your strengths and preferences
                </CardDescription>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Discover traits, work styles, and environments where you naturally thrive. We map your personality to domains and roles with the highest success-fit.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-accent/10 w-20 h-20 flex items-center justify-center">
                    <Map className="w-10 h-10 text-accent" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Career Roadmap</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  Get a personalized timeline with milestones and required skills
                </CardDescription>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Visual, milestone-driven roadmaps with time estimates, skill checkpoints, internships, and certifications. Adjusts dynamically as you learn.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Course Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  Direct links to courses that align with your career goals
                </CardDescription>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Only the most relevant courses, sequenced to your roadmap. Mixes free and paid resources with practice projects and assessments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 pt-8">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Begin your personalized career journey today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/courses")} className="text-lg px-8">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/career-paths")} className="text-lg px-8">
                Explore Career Paths
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;

