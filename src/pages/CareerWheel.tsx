import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const careers = [
  "Software Developer", "Doctor", "Teacher", "Lawyer", "Architect",
  "Data Scientist", "Marketing Manager", "Entrepreneur", "Psychologist",
  "Graphic Designer", "Chef", "Civil Engineer", "Journalist", "Accountant",
  "Fashion Designer", "Photographer", "Pharmacist", "Social Worker"
];

const CareerWheel = () => {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinDurationMs, setSpinDurationMs] = useState(3000);

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setSelectedCareer(null);
    
    const randomIndex = Math.floor(Math.random() * careers.length);
    const randomCareer = careers[randomIndex];
    
    // Calculate rotation: multiple full spins + position for selected career
    const segmentAngle = 360 / careers.length;
    const fullSpins = 6 + Math.floor(Math.random() * 3); // 6-8 spins
    const targetRotation = 360 * fullSpins + (randomIndex * segmentAngle);
    const duration = 3800 + Math.floor(Math.random() * 1800); // 3.8s - 5.6s
    setSpinDurationMs(duration);
    
    setRotation(targetRotation);
    
    setTimeout(() => {
      setSelectedCareer(randomCareer);
      setSpinning(false);
    }, duration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      <div className="container py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back to Fun Tools Button */}
          <div className="flex justify-start">
            <Button variant="ghost" onClick={() => navigate('/fun-tools')} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Fun Tools
            </Button>
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Career Wheel of Fortune
            </h1>
            <p className="text-lg text-muted-foreground">
              Feeling adventurous? Spin the wheel and discover a random career path!
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            {/* Wheel Container */}
            <div className="relative">
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
                <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-primary" />
              </div>
              
              {/* Wheel */}
              <div
                className="w-80 h-80 rounded-full border-8 border-primary bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl transition-transform ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transitionDuration: `${spinDurationMs}ms`,
                  background: `conic-gradient(
                    from 0deg,
                    hsl(var(--primary)) 0deg,
                    hsl(var(--secondary)) 90deg,
                    hsl(var(--accent)) 180deg,
                    hsl(var(--primary)) 270deg,
                    hsl(var(--secondary)) 360deg
                  )`
                }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center text-white font-bold text-2xl drop-shadow-lg">
                    SPIN
                  </div>
                </div>
              </div>
            </div>

            {/* Spin Button */}
            <Button
              size="lg"
              onClick={spinWheel}
              disabled={spinning}
              className="text-lg px-8 py-6"
            >
              {spinning ? "Spinning..." : "Spin the Wheel!"}
            </Button>

            {/* Result Card */}
            {selectedCareer && !spinning && (
              <Card className="w-full max-w-md shadow-lg animate-fade-in">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">🎉 You Got:</CardTitle>
                  <CardDescription className="text-3xl font-bold text-primary mt-4">
                    {selectedCareer}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center text-muted-foreground">
                    Interested in learning more about this career?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="flex-1"
                      onClick={() => navigate('/test')}
                    >
                      Take Full Assessment
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={spinWheel}
                    >
                      Spin Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Career List */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Available Careers</CardTitle>
              <CardDescription>
                These are all the exciting career paths on the wheel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {careers.map((career) => (
                  <div
                    key={career}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      selectedCareer === career
                        ? 'bg-primary/20 border-primary'
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    {career}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CareerWheel;
