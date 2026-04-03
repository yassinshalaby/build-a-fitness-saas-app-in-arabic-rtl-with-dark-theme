import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Target, Clock, BarChart3, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "ما هو هدفك الرئيسي؟",
    options: ["خسارة الوزن", "بناء العضلات", "تحسين اللياقة", "زيادة المرونة"],
  },
  {
    icon: Dumbbell,
    title: "ما مستوى خبرتك؟",
    options: ["مبتدئ", "متوسط", "متقدم", "محترف"],
  },
  {
    icon: Clock,
    title: "كم مرة تتمرن أسبوعيًا؟",
    options: ["1-2 مرات", "3-4 مرات", "5-6 مرات", "يوميًا"],
  },
  {
    icon: BarChart3,
    title: "ما هو وزنك الحالي؟",
    options: ["أقل من 60 كجم", "60-80 كجم", "80-100 كجم", "أكثر من 100 كجم"],
  },
  {
    icon: Sparkles,
    title: "ما نوع التمارين المفضلة؟",
    options: ["تمارين القوة", "تمارين الكارديو", "يوغا وتمدد", "تمارين مختلطة"],
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg animate-fade-in" key={currentStep}>
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= currentStep ? "gradient-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
          <p className="text-muted-foreground text-sm mt-1">الخطوة {currentStep + 1} من {steps.length}</p>
        </div>

        <div className="space-y-3 mb-8">
          {step.options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full p-4 rounded-lg border text-right transition-all ${
                answers[currentStep] === option
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="flex-1">
              السابق
            </Button>
          )}
          <Button
            variant="hero"
            onClick={handleNext}
            disabled={!answers[currentStep]}
            className="flex-1"
          >
            {currentStep === steps.length - 1 ? "ابدأ الآن" : "التالي"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
