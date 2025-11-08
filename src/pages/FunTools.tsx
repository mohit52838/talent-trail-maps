import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FunTools = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      <main className="container py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
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
              Fun Career Tools
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Explore your career potential in creative and engaging ways
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 group">
              <CardHeader className="space-y-6 pb-6">
                <div className="flex justify-center">
                  <div className="p-5 rounded-full bg-gradient-to-br from-primary to-secondary w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl text-center">Spirit Animal Career Quiz</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CardDescription className="text-lg leading-relaxed">
                  Discover your career personality through a fun spirit animal quiz! Find out if you're an analytical owl, social dolphin, leader wolf, or creative fox.
                </CardDescription>
                <Button 
                  size="lg" 
                  className="w-full text-lg group-hover:scale-105 transition-transform" 
                  onClick={() => navigate("/spirit-animal")}
                >
                  Take the Quiz
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 group">
              <CardHeader className="space-y-6 pb-6">
                <div className="flex justify-center">
                  <div className="p-5 rounded-full bg-gradient-to-br from-secondary to-accent w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl text-center">Career Wheel of Fortune</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CardDescription className="text-lg leading-relaxed">
                  Feeling adventurous? Spin the wheel and discover random career paths! A fun way to explore options you might not have considered.
                </CardDescription>
                <Button 
                  size="lg" 
                  className="w-full text-lg group-hover:scale-105 transition-transform" 
                  onClick={() => navigate("/career-wheel")}
                >
                  Spin the Wheel
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 pt-8">
            <h2 className="text-3xl font-bold">Ready for a Serious Assessment?</h2>
            <p className="text-lg text-muted-foreground">
              Get personalized career recommendations based on your personality and interests
            </p>
            <Button size="lg" onClick={() => navigate("/test")} className="text-lg px-8">
              Take Full Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FunTools;

