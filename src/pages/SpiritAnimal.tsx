import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: "How do you prefer to spend your free time?",
    options: [
      { value: "alone", text: "Reading or solo activities", animal: "owl" },
      { value: "social", text: "Hanging out with friends", animal: "dolphin" },
      { value: "nature", text: "Outdoor adventures", animal: "wolf" },
      { value: "creative", text: "Creating or building things", animal: "fox" }
    ]
  },
  {
    question: "What's your approach to challenges?",
    options: [
      { value: "think", text: "Analyze and plan carefully", animal: "owl" },
      { value: "team", text: "Collaborate with others", animal: "dolphin" },
      { value: "lead", text: "Take charge and lead", animal: "wolf" },
      { value: "creative", text: "Find creative solutions", animal: "fox" }
    ]
  },
  {
    question: "What motivates you most?",
    options: [
      { value: "knowledge", text: "Learning and wisdom", animal: "owl" },
      { value: "connection", text: "Helping others", animal: "dolphin" },
      { value: "achievement", text: "Success and recognition", animal: "wolf" },
      { value: "innovation", text: "Creating new things", animal: "fox" }
    ]
  }
];

const animalResults = {
  owl: {
    name: "Wise Owl",
    description: "You're analytical, thoughtful, and love diving deep into subjects. Perfect for research, academia, or analytical roles.",
    careers: ["Researcher", "Data Scientist", "Librarian", "Analyst", "Academic"],
    emoji: "🦉"
  },
  dolphin: {
    name: "Friendly Dolphin",
    description: "You're social, empathetic, and thrive in team environments. Great for people-focused careers.",
    careers: ["Teacher", "HR Professional", "Counselor", "Social Worker", "Event Manager"],
    emoji: "🐬"
  },
  wolf: {
    name: "Leader Wolf",
    description: "You're independent, strategic, and natural leader. Excellent for leadership and entrepreneurial roles.",
    careers: ["Entrepreneur", "Manager", "Military Officer", "CEO", "Project Lead"],
    emoji: "🐺"
  },
  fox: {
    name: "Creative Fox",
    description: "You're clever, adaptable, and innovative. Perfect for creative and problem-solving careers.",
    careers: ["Designer", "Inventor", "Artist", "Marketing Strategist", "Architect"],
    emoji: "🦊"
  }
};

const SpiritAnimal = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const animalCounts: Record<string, number> = {};
    
    answers.forEach((answer) => {
      const question = questions.find((q) => 
        q.options.some((opt) => opt.value === answer)
      );
      const option = question?.options.find((opt) => opt.value === answer);
      if (option) {
        animalCounts[option.animal] = (animalCounts[option.animal] || 0) + 1;
      }
    });

    const resultAnimal = Object.keys(animalCounts).reduce((a, b) => 
      animalCounts[a] > animalCounts[b] ? a : b
    );
    
    setResult(resultAnimal);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    const animalInfo = animalResults[result as keyof typeof animalResults];
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <Navbar />
        <div className="container py-16 px-4">
          <div className="max-w-2xl mx-auto space-y-4 mb-6">
            <Button variant="ghost" onClick={() => navigate('/fun-tools')} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Fun Tools
            </Button>
          </div>
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="text-center">
              <div className="text-8xl mb-4">{animalInfo.emoji}</div>
              <CardTitle className="text-3xl">You're a {animalInfo.name}!</CardTitle>
              <CardDescription className="text-lg mt-4">
                {animalInfo.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Recommended Career Paths:</h3>
                <div className="flex flex-wrap gap-2">
                  {animalInfo.careers.map((career) => (
                    <Badge key={career} variant="secondary" className="text-sm">
                      {career}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={resetQuiz}>
                Take Quiz Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      <div className="container py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/fun-tools')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Fun Tools
          </Button>
        </div>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-3xl">Spirit Animal Career Quiz</CardTitle>
            <CardDescription className="text-lg">
              Discover your career personality through a fun animal quiz!
            </CardDescription>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-semibold">{question.question}</h3>
            <RadioGroup
              value={answers[currentQuestion]}
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
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className="w-full"
            >
              {currentQuestion === questions.length - 1 ? "See Your Result" : "Next Question"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpiritAnimal;
