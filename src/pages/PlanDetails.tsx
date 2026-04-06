import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Clock, Dumbbell, Bookmark, Star, Play, ArrowRight } from "lucide-react";
import { useState } from "react";
import { workoutPlans } from "@/lib/plans-data";
import { BottomNav } from "@/components/BottomNav";

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const [started, setStarted] = useState(false);

  const plan = workoutPlans.find((p) => p.id === id);

  if (!plan) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">الخطة غير موجودة</p>
          <button onClick={() => navigate("/dashboard")} className="mt-4 text-primary underline">
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const levelColor = {
    "مبتدئ": "bg-green-500/10 text-green-400 border-green-500/20",
    "متوسط": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "متقدم": "bg-red-500/10 text-red-400 border-red-500/20",
  }[plan.level];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-[280px] w-full overflow-hidden">
        <img src={plan.image} alt={plan.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-12">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="rounded-full bg-black/40 p-2.5 backdrop-blur-sm"
          >
            <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-primary text-primary" : "text-white"}`} />
          </button>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-black/40 p-2.5 backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 right-0 p-6">
          {plan.badge && (
            <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
              {plan.badge}
            </span>
          )}
          <h1 className="text-2xl font-bold text-white">{plan.title}</h1>
          <p className="mt-1 text-sm text-white/60">{plan.titleEn}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-4 -mt-2">
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <Clock className="mx-auto mb-1 h-4 w-4 text-primary" />
          <p className="text-xs font-semibold text-foreground">{plan.duration}</p>
          <p className="text-[10px] text-muted-foreground">المدة</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <Dumbbell className="mx-auto mb-1 h-4 w-4 text-primary" />
          <p className="text-xs font-semibold text-foreground">{plan.daysPerWeek} أيام</p>
          <p className="text-[10px] text-muted-foreground">في الأسبوع</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <Star className="mx-auto mb-1 h-4 w-4 text-primary" />
          <p className={`text-xs font-semibold`}><span className={`rounded-full border px-2 py-0.5 ${levelColor}`}>{plan.level}</span></p>
          <p className="text-[10px] text-muted-foreground mt-1">المستوى</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-semibold text-foreground mb-2">عن البرنامج</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
      </div>

      {/* Muscles */}
      <div className="px-4 mt-4">
        <h2 className="text-sm font-semibold text-foreground mb-2">العضلات المستهدفة</h2>
        <div className="flex flex-wrap gap-2">
          {plan.muscles.map((m) => (
            <span key={m} className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs text-primary">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">جدول التمارين</h2>
        <div className="space-y-3">
          {plan.days.map((day) => (
            <div key={day.day} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
                    {day.day}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{day.title}</h3>
                    <p className="text-[11px] text-muted-foreground">{day.focus}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {day.exercises.map((ex) => (
                  <span key={ex} className="rounded-lg bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-10">
        <button
          onClick={() => setStarted(!started)}
          className={`w-full rounded-2xl py-4 text-base font-bold transition-all ${
            started
              ? "bg-green-600 text-white"
              : "gradient-primary text-primary-foreground"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Play className={`h-5 w-5 ${started ? "fill-white" : "fill-primary-foreground"}`} />
            {started ? "تم البدء ✓" : "ابدأ البرنامج"}
          </div>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default PlanDetails;
