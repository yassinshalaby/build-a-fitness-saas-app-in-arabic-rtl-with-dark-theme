import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Flame, Dumbbell } from "lucide-react";
import { ExerciseCard, type ExerciseData } from "@/components/ExerciseCard";
import { RestTimer } from "@/components/RestTimer";
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

const defaultSets: Record<string, { sets: number; reps: string; rest: string; restSeconds: number }> = {
  "Chest": { sets: 4, reps: "10-12", rest: "90 ثانية", restSeconds: 90 },
  "Arms (Triceps)": { sets: 3, reps: "12", rest: "60 ثانية", restSeconds: 60 },
  "Arms (Biceps)": { sets: 3, reps: "12", rest: "60 ثانية", restSeconds: 60 },
  "Core": { sets: 3, reps: "15-20", rest: "45 ثانية", restSeconds: 45 },
  "Legs (Glutes)": { sets: 4, reps: "10", rest: "60 ثانية", restSeconds: 60 },
  "Legs (Quads)": { sets: 4, reps: "10", rest: "90 ثانية", restSeconds: 90 },
  "Shoulders": { sets: 3, reps: "12", rest: "60 ثانية", restSeconds: 60 },
  "Back (Lats)": { sets: 4, reps: "10", rest: "90 ثانية", restSeconds: 90 },
  "Back (Traps)": { sets: 3, reps: "12", rest: "60 ثانية", restSeconds: 60 },
};

const WorkoutView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = workoutPlans[id || "1"] || workoutPlans["1"];
  const [restState, setRestState] = useState<{
    exerciseIndex: number;
    duration: number;
  } | null>(null);

  const { data: exercises, isLoading } = useQuery({
    queryKey: ["workout-exercises", id],
    queryFn: async () => {
      const perMuscle = Math.ceil(plan.limit / plan.muscles.length);
      const results = await Promise.all(
        plan.muscles.map(async (muscle) => {
          const { data, error } = await externalSupabase
            .from("saas_workouts")
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

  const mappedExercises: ExerciseData[] = (exercises || []).map((ex) => {
    const config = defaultSets[ex.muscle] || { sets: 3, reps: "10", rest: "60 ثانية", restSeconds: 60 };
    return {
      name: ex.name,
      gifUrl: ex.gif_url,
      muscle: ex.muscle,
      type: ex.type,
      sets: config.sets,
      reps: config.reps,
      rest: config.rest,
    };
  });

  const handleSetDone = (exerciseIndex: number) => {
    const ex = mappedExercises[exerciseIndex];
    const config = defaultSets[ex.muscle] || { restSeconds: 60 };
    setRestState({ exerciseIndex, duration: config.restSeconds });
  };

  const handleRestComplete = () => {
    setRestState(null);
  };

  // Show rest timer overlay
  if (restState !== null) {
    const currentEx = mappedExercises[restState.exerciseIndex];
    const nextEx = mappedExercises[restState.exerciseIndex + 1];
    return (
      <RestTimer
        durationSeconds={restState.duration}
        currentExercise={currentEx}
        nextExercise={nextEx}
        onComplete={handleRestComplete}
        onSkip={handleRestComplete}
      />
    );
  }

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
          <span className="flex items-center gap-1"><Dumbbell className="w-4 h-4" />{mappedExercises.length} تمارين</span>
        </div>
      </div>

      {/* Exercises */}
      <div className="px-4 space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-4 h-32 animate-pulse" />
          ))
        ) : mappedExercises.map((ex, i) => (
          <ExerciseCard
            key={i}
            exercise={ex}
            index={i}
            onDone={() => handleSetDone(i)}
            onSkip={() => {}}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default WorkoutView;
