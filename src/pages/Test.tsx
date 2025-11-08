import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, ArrowLeft, Home } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { computePersonalityType, loadJourneyData, PERSONALITY_QUESTIONS, updateJourneyData } from "@/lib/journey";

const Test = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const journey = useMemo(() => loadJourneyData(), []);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [category, setCategory] = useState<string | undefined>(
    () => (location.state as { category?: string } | undefined)?.category || journey.category
  );
  const [qualificationLevel, setQualificationLevel] = useState<string>(() => {
    if (typeof window === 'undefined') return journey.grade || "";
    return localStorage.getItem('qualificationLevel') || journey.grade || "";
  });

  useEffect(() => {
    if (!qualificationLevel) {
      toast({
        title: "Select your grade",
        description: "Please choose your current grade from the home page before starting the assessment.",
        variant: "destructive",
      });
      navigate('/', { state: { scrollTo: 'career-paths' } });
    }
  }, [qualificationLevel, navigate, toast]);

  useEffect(() => {
    if ((location.state as { category?: string } | undefined)?.category) {
      const cat = (location.state as { category?: string }).category;
      setCategory(cat);
      updateJourneyData({ category: cat });
    }
  }, [location.state]);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (answers[currentQuestion]) {
      if (currentQuestion < PERSONALITY_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const personalityType = computePersonalityType(answers);

    updateJourneyData({
      testAnswers: answers,
      personalityType,
      category,
      grade: qualificationLevel as any,
    });

    toast({
      title: "Assessment complete",
      description: `Great work! We found your personality fit: ${personalityType}.`,
    });

    navigate("/results");
  };

  const progress = ((currentQuestion + 1) / PERSONALITY_QUESTIONS.length) * 100;
  const question = PERSONALITY_QUESTIONS[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <Home className="h-5 w-5" />
        </Button>
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Career Assessment Test</CardTitle>
          <CardDescription>
            Answer honestly to get personalized career recommendations
          </CardDescription>
          <Progress value={progress} className="mt-4" />
          <p className="text-sm text-muted-foreground mt-2">
            Question {currentQuestion + 1} of {PERSONALITY_QUESTIONS.length}
          </p>
          <p className="text-xs text-muted-foreground">
            {qualificationLevel ? `Based on ${qualificationLevel} roadmap` : "Select a grade to tailor recommendations"}
            {category && `  •  Focus: ${category.replace(/^[a-z]/, (c) => c.toUpperCase())}`}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{question.question}</h3>
            <RadioGroup
              value={answers[currentQuestion] ?? ""}
              onValueChange={handleAnswer}
            >
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors select-none cursor-pointer"
                  onMouseDown={() => handleAnswer(option.value)}
                  onClick={() => handleAnswer(option.value)}
                  role="radio"
                  aria-checked={answers[currentQuestion] === option.value}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleAnswer(option.value);
                    }
                  }}
                >
                  <RadioGroupItem value={option.value} id={`${currentQuestion}-${option.value}`} />
                  <Label htmlFor={`${currentQuestion}-${option.value}`} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion] || loading}
              className="ml-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : currentQuestion === PERSONALITY_QUESTIONS.length - 1 ? (
                "Complete Test"
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Test;
