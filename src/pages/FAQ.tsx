import { Navbar } from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How accurate is the personality test?",
      answer: "Our test is based on the MBTI framework, which is widely used for career guidance. While no test is 100% accurate, ours provides valuable insights to help you understand your strengths and preferences. We combine it with AI to provide personalized career recommendations."
    },
    {
      question: "Is this platform free to use?",
      answer: "Yes! Our basic features including the personality test, career suggestions, and roadmaps are completely free. You can create an account and start exploring your career options at no cost."
    },
    {
      question: "What if I'm undecided between 10th and 12th qualification?",
      answer: "You can take the test for both levels! Select 10th first to see options available after 10th grade, then take it again with 12th selected to see advanced career paths. This helps you plan your academic journey better."
    },
    {
      question: "How are career roadmaps created?",
      answer: "Our roadmaps are generated using AI and are based on industry standards, educational requirements, and typical career progression paths. They include courses, skills, timelines, and milestones to help you achieve your goals."
    },
    {
      question: "Can I save my results and come back later?",
      answer: "Yes! Once you create an account, all your test results, career selections, and roadmaps are automatically saved. You can log in anytime to review or update them."
    },
    {
      question: "What makes this different from other career guidance platforms?",
      answer: "We combine personality assessment with AI-powered recommendations, provide detailed roadmaps with specific courses, and offer fun interactive tools to explore careers. Our platform is designed specifically for students at the 10th and 12th grade levels."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      <main className="container py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Got questions? We've got answers!
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border-2 rounded-lg px-6 py-2 hover:border-primary transition-colors"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="text-center space-y-6 pt-8">
            <h2 className="text-3xl font-bold">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground">
              Reach out to us and we'll be happy to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/contact")} className="text-lg px-8">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/")} className="text-lg px-8">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;

