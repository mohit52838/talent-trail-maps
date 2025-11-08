import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Loader2, TrendingUp, Scale, Heart, Zap, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { findCareerById, loadJourneyData, updateJourneyData } from "@/lib/journey";

const criteriaItems = [
  {
    key: "financial_growth",
    label: "Financial Growth",
    description: "High salary and wealth accumulation",
    icon: TrendingUp,
  },
  {
    key: "work_life_balance",
    label: "Work-Life Balance",
    description: "Time for personal life and hobbies",
    icon: Scale,
  },
  {
    key: "social_impact",
    label: "Social Impact",
    description: "Making a positive difference in society",
    icon: Heart,
  },
  {
    key: "freedom_autonomy",
    label: "Freedom & Autonomy",
    description: "Independence and flexible work",
    icon: Zap,
  },
  {
    key: "recognition",
    label: "Recognition & Status",
    description: "Respect and acknowledgment in your field",
    icon: Award,
  },
];

const SuccessCriteria = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const careerId = searchParams.get("career");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<Record<string, number>>({
    financial_growth: 5,
    work_life_balance: 5,
    social_impact: 5,
    freedom_autonomy: 5,
    recognition: 5,
  });

  useEffect(() => {
    const journey = loadJourneyData();

    if (!journey.testAnswers) {
      toast({
        title: "Complete assessment",
        description: "Take the career assessment first to personalize your roadmap.",
      });
      navigate('/test');
      return;
    }

    if (journey.successCriteria) {
      setValues((prev) => ({ ...prev, ...journey.successCriteria }));
    }

    const lastCareer = careerId || journey.lastCareerId;
    if (!lastCareer) {
      toast({
        title: "Choose a career",
        description: "Pick a career to continue building your roadmap.",
      });
      navigate('/results');
      return;
    }

    if (!findCareerById(lastCareer)) {
      navigate('/results');
    }
  }, [careerId, navigate, toast]);

  const handleSliderChange = (key: string, value: number[]) => {
    setValues({ ...values, [key]: value[0] });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const journey = loadJourneyData();
    const targetCareer = careerId || journey.lastCareerId;

    updateJourneyData({ successCriteria: values, lastCareerId: targetCareer || undefined });

    toast({
      title: "Saved",
      description: "Got it! We’ll tailor the roadmap to what matters most to you.",
    });

    const nextCareer = targetCareer ? `?career=${targetCareer}` : "";
    setLoading(false);
    navigate(`/roadmap${nextCareer}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      <div className="container py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Define Your Success
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What does a successful career mean to you? Rate each factor to personalize your roadmap
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Success Factors</CardTitle>
            <CardDescription>
              Rate each factor from 1 (not important) to 10 (extremely important)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {criteriaItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-base font-semibold">{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="text-2xl font-bold text-primary min-w-[3ch] text-right">
                      {values[item.key]}
                    </span>
                  </div>
                  <Slider
                    value={[values[item.key]]}
                    onValueChange={(value) => handleSliderChange(item.key, value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              );
            })}

            <Button
              size="lg"
              className="w-full mt-8"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Your Roadmap...
                </>
              ) : (
                "Create My Personalized Roadmap"
              )}
            </Button>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default SuccessCriteria;
