import { BottomNav } from "@/components/BottomNav";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Flame, Dumbbell } from "lucide-react";
import { ExerciseCard } from "@/components/ExerciseCard";
import { useQuery } from "@tanstack/react-query";
import { externalSupabase } from "@/integrations/supabase/external-client";

interface WorkoutExercise {
  nameAr: string;
  nameEn: string;
  sets: number;
  reps: string;
  rest: string;
}

const workoutData: Record<string, { title: string; duration: string; calories: number; exercises: WorkoutExercise[] }> = {
  "1": {
    title: "تمرين الصدر والترايسبس",
    duration: "45 دقيقة",
    calories: 320,
    exercises: [
      { nameAr: "بنش بريس", nameEn: "Barbell bench press", sets: 4, reps: "10-12", rest: "90 ثانية" },
      { nameAr: "ضغط مائل بالدمبل", nameEn: "Dumbbell incline bench press", sets: 3, reps: "12", rest: "60 ثانية" },
      { nameAr: "تفتيح صدر", nameEn: "Dumbbell fly", sets: 3, reps: "15", rest: "60 ثانية" },
      { nameAr: "ديبس", nameEn: "Chest dip", sets: 3, reps: "10", rest: "90 ثانية" },
      { nameAr: "تمديد ترايسبس", nameEn: "Barbell lying triceps extension", sets: 3, reps: "12", rest: "60 ثانية" },
      { nameAr: "بوش أب", nameEn: "Push-up", sets: 3, reps: "حتى الفشل", rest: "60 ثانية" },
    ],
  },
  "2": {
    title: "تمرين الكارديو",
    duration: "30 دقيقة",
    calories: 250,
    exercises: [
      { nameAr: "جري على السير", nameEn: "Treadmill walking", sets: 1, reps: "10 دقائق", rest: "-" },
      { nameAr: "تمرين بيربي", nameEn: "Burpee", sets: 4, reps: "10", rest: "45 ثانية" },
      { nameAr: "قفز الحبل", nameEn: "Jump rope", sets: 3, reps: "دقيقتان", rest: "30 ثانية" },
      { nameAr: "ماونتن كلايمبر", nameEn: "Mountain climber", sets: 3, reps: "20", rest: "30 ثانية" },
    ],
  },
};

const WorkoutView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workoutData[id || "1"] || workoutData["1"];

  const exerciseNames = workout.exercises.map((e) => e.nameEn);

  const { data: gifMap } = useQuery({
    queryKey: ["exercise-gifs", id],
    queryFn: async () => {
      const map: Record<string, string> = {};
      // Search for each exercise by partial name match
      for (const name of exerciseNames) {
        const searchTerm = name.split(" ").slice(0, 2).join(" ");
        const { data } = await externalSupabase
          .from("exercises")
          .select("name, gif_url")
          .ilike("name", `%${searchTerm}%`)
          .limit(1);
        if (data && data.length > 0) {
          map[name] = data[0].gif_url;
        }
      }
      return map;
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
        <h1 className="text-2xl font-bold text-foreground">{workout.title}</h1>
        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{workout.duration}</span>
          <span className="flex items-center gap-1"><Flame className="w-4 h-4" />{workout.calories} سعرة</span>
          <span className="flex items-center gap-1"><Dumbbell className="w-4 h-4" />{workout.exercises.length} تمارين</span>
        </div>
      </div>

      {/* Exercises */}
      <div className="px-4 space-y-3">
        {workout.exercises.map((exercise, i) => (
          <ExerciseCard
            key={i}
            exercise={{
              name: exercise.nameAr,
              sets: exercise.sets,
              reps: exercise.reps,
              rest: exercise.rest,
              gifUrl: gifMap?.[exercise.nameEn],
            }}
            index={i}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default WorkoutView;
