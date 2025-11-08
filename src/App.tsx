import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Test = lazy(() => import("./pages/Test"));
const Results = lazy(() => import("./pages/Results"));
const SuccessCriteria = lazy(() => import("./pages/SuccessCriteria"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const SpiritAnimal = lazy(() => import("./pages/SpiritAnimal"));
const CareerWheel = lazy(() => import("./pages/CareerWheel"));
const Courses = lazy(() => import("./pages/Courses"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const CareerPaths = lazy(() => import("./pages/CareerPaths"));
const FunTools = lazy(() => import("./pages/FunTools"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/career-paths" element={<CareerPaths />} />
                <Route path="/fun-tools" element={<FunTools />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/test" element={<Test />} />
                <Route path="/results" element={<Results />} />
                <Route path="/success-criteria" element={<SuccessCriteria />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/spirit-animal" element={<SpiritAnimal />} />
                <Route path="/career-wheel" element={<CareerWheel />} />
                <Route path="/courses" element={<Courses />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
