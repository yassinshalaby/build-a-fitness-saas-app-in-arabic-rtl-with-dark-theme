import { BottomNav } from "@/components/BottomNav";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Flame, Dumbbell } from "lucide-react";
import { ExerciseCard } from "@/components/ExerciseCard";
import { useQuery } from "@tanstack/react-query";
import { externalSupabase } from "@/integrations/supabase/external-client";

interface WorkoutPlan {
  title: string;
  duration: string;
  calories: number;
  muscles: string[];
  limit: number;
}

const workoutPlans: Record<string, WorkoutPlan> = {
  "1": {
    title: "تمرين الصدر والترايسبس",
    duration: "45 دقيقة",
    calories: 320,
    muscles: ["Chest", "Arms (Triceps)"],
    limit: 6,
  },
  "2": {
    title: "تمرين الكارديو والبطن",
    duration: "30 دقيقة",
    calories: 250,
    muscles: ["Core", "Legs (Glutes)"],
    limit: 6,
  },
};

const defaultSets: Record<string, { sets: number; reps: string; rest: string }> = {
  "Chest": { sets: 4, reps: "10-12", rest: "90 ثانية" },
  "Arms (Triceps)": { sets: 3, reps: "12", rest: "60 ثانية" },
  "Arms (Biceps)": { sets: 3, reps: "12", rest: "60 ثانية" },
  "Core": { sets: 3, reps: "15-20", rest: "45 ثانية" },
  "Legs (Glutes)": { sets: 4, reps: "10", rest: "60 ثانية" },
  "Legs (Quads)": { sets: 4, reps: "10", rest: "90 ثانية" },
  "Shoulders": { sets: 3, reps: "12", rest: "60 ثانية" },
  "Back (Lats)": { sets: 4, reps: "10", rest: "90 ثانية" },
  "Back (Traps)": { sets: 3, reps: "12", rest: "60 ثانية" },
};

const WorkoutView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = workoutPlans[id || "1"] || workoutPlans["1"];

  const { data: exercises, isLoading } = useQuery({
    queryKey: ["workout-exercises", id],
    queryFn: async () => {
      const perMuscle = Math.ceil(plan.limit / plan.muscles.length);
      const results = await Promise.all(
        plan.muscles.map(async (muscle) => {
          const { data, error } = await externalSupabase
            .from("exercises")
            .select("id, name, gif_url, muscle, type")
            .eq("muscle", muscle)
            .limit(perMuscle);
          if (error) throw error;
          return data || [];
        })
      );
      return results.flat();
    },
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="p-6 pt-12">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2">
          <ArrowRight className="w-5 h-5" />
          رجوع
        </button>
        <h1 className="text-2xl font-bold text-foreground">{plan.title}</h1>
        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{plan.duration}</span>
          <span className="flex items-center gap-1"><Flame className="w-4 h-4" />{plan.calories} سعرة</span>
          <span className="flex items-center gap-1"><Dumbbell className="w-4 h-4" />{exercises?.length || 0} تمارين</span>
        </div>
      </div>

      {/* Exercises */}
      <div className="px-4 space-y-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 h-24 animate-pulse" />
          ))
        ) : exercises?.map((ex, i) => {
          const config = defaultSets[ex.muscle] || { sets: 3, reps: "10", rest: "60 ثانية" };
          return (
            <ExerciseCard
              key={ex.id}
              exercise={{
                name: ex.name,
                sets: config.sets,
                reps: config.reps,
                rest: config.rest,
                gifUrl: ex.gif_url,
              }}
              index={i}
            />
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default WorkoutView;
