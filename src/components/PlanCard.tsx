import { Bookmark, Clock, Dumbbell, Star } from "lucide-react";
import { useState } from "react";
import type { WorkoutPlan } from "@/lib/plans-data";

interface PlanCardProps {
  plan: WorkoutPlan;
  onClick: () => void;
  featured?: boolean;
}

export const PlanCard = ({ plan, onClick, featured }: PlanCardProps) => {
  const [bookmarked, setBookmarked] = useState(false);

  const levelColor = {
    "مبتدئ": "text-green-400",
    "متوسط": "text-yellow-400",
    "متقدم": "text-red-400",
  }[plan.level];

  return (
    <button
      onClick={onClick}
      className={`relative flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-card text-right transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
        featured ? "w-[300px]" : "w-[240px]"
      }`}
    >
      {/* Image */}
      <div className={`relative w-full overflow-hidden ${featured ? "h-[200px]" : "h-[160px]"}`}>
        <img
          src={plan.image}
          alt={plan.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badge */}
        {plan.badge && (
          <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
            {plan.badge}
          </span>
        )}

        {/* Bookmark */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setBookmarked(!bookmarked);
          }}
          className="absolute top-3 left-3 rounded-full bg-black/40 p-2 backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <Bookmark
            className={`h-4 w-4 ${bookmarked ? "fill-primary text-primary" : "text-white/80"}`}
          />
        </button>

        {/* Recommended star */}
        {plan.recommended && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1">
            <Star className="h-3 w-3 fill-primary-foreground text-primary-foreground" />
            <span className="text-[10px] font-bold text-primary-foreground">موصى به</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`font-bold text-foreground ${featured ? "text-base" : "text-sm"}`}>
          {plan.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{plan.titleEn}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {plan.duration}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Dumbbell className="h-3 w-3" />
            {plan.daysPerWeek} أيام/أسبوع
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className={`text-[11px] font-semibold ${levelColor}`}>{plan.level}</span>
          <div className="flex gap-1">
            {plan.muscles.slice(0, 3).map((m) => (
              <span
                key={m}
                className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
};
