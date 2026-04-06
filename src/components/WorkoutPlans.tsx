import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { PlanCard } from "./PlanCard";
import { planCategories, workoutPlans } from "@/lib/plans-data";

export const WorkoutPlans = () => {
  const navigate = useNavigate();

  // Get the first recommended plan
  const recommended = workoutPlans.find((p) => p.recommended);

  return (
    <div className="mt-8">
      {/* Section Header */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-semibold text-foreground">خطط التمرين</h2>
        <p className="text-xs text-muted-foreground mt-1">اختر خطة تناسب أهدافك وابدأ رحلتك</p>
      </div>

      {/* Recommended Plan */}
      {recommended && (
        <div className="px-4 mb-6">
          <button
            onClick={() => navigate(`/plan/${recommended.id}`)}
            className="relative w-full overflow-hidden rounded-2xl border border-primary/30 bg-card text-right"
          >
            <div className="relative h-[180px] w-full overflow-hidden">
              <img
                src={recommended.image}
                alt={recommended.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 right-0 p-5">
                <div className="mb-2 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 w-fit">
                  <Star className="h-3 w-3 fill-primary-foreground text-primary-foreground" />
                  <span className="text-[11px] font-bold text-primary-foreground">الخطة الموصى بها</span>
                </div>
                <h3 className="text-lg font-bold text-white">{recommended.title}</h3>
                <p className="mt-1 text-xs text-white/70">{recommended.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-border">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{recommended.duration}</span>
                <span>•</span>
                <span>{recommended.daysPerWeek} أيام/أسبوع</span>
                <span>•</span>
                <span className="text-green-400">{recommended.level}</span>
              </div>
              <span className="rounded-full gradient-primary px-4 py-2 text-xs font-bold text-primary-foreground">
                ابدأ الآن
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Categories */}
      {planCategories.map((cat) => {
        const plans = workoutPlans.filter((p) => p.category === cat.id);
        if (plans.length === 0) return null;

        return (
          <div key={cat.id} className="mb-6">
            <h3 className="px-4 mb-3 text-sm font-semibold text-foreground">{cat.label}</h3>
            <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onClick={() => navigate(`/plan/${plan.id}`)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
