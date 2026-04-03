import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dumbbell, TrendingUp, Brain, ArrowLeft } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Dumbbell, title: "تمارين مخصصة", desc: "برامج تدريبية مصممة حسب أهدافك ومستواك" },
  { icon: TrendingUp, title: "تتبع التقدم", desc: "رسوم بيانية تفاعلية لمتابعة تطورك" },
  { icon: Brain, title: "مساعد ذكي", desc: "مدرب شخصي بالذكاء الاصطناعي متاح دائمًا" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            غيّر جسمك مع{" "}
            <span className="text-gradient">FitFlow</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            منصة اللياقة البدنية الذكية التي تتكيف مع أهدافك وتقدمك
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")} className="text-lg px-8">
              ابدأ مجانًا
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/auth")} className="text-lg px-8">
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            كل ما تحتاجه في <span className="text-gradient">مكان واحد</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">جاهز للبدء؟</h2>
          <p className="text-muted-foreground mb-8">انضم لآلاف المستخدمين الذين غيروا حياتهم</p>
          <Button variant="hero" size="lg" onClick={() => navigate("/auth")} className="text-lg px-10">
            أنشئ حسابك الآن
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
