import { BottomNav } from "@/components/BottomNav";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Flame, Dumbbell } from "lucide-react";
import { ExerciseCard } from "@/components/ExerciseCard";

const workoutData: Record<string, { title: string; duration: string; calories: number; exercises: { name: string; sets: number; reps: string; rest: string; image?: string }[] }> = {
  "1": {
    title: "تمرين الصدر والترايسبس",
    duration: "45 دقيقة",
    calories: 320,
    exercises: [
      { name: "بنش بريس", sets: 4, reps: "10-12", rest: "90 ثانية" },
      { name: "ضغط مائل بالدمبل", sets: 3, reps: "12", rest: "60 ثانية" },
      { name: "تفتيح صدر", sets: 3, reps: "15", rest: "60 ثانية" },
      { name: "ديبس", sets: 3, reps: "10", rest: "90 ثانية" },
      { name: "تمديد ترايسبس", sets: 3, reps: "12", rest: "60 ثانية" },
      { name: "بوش أب", sets: 3, reps: "حتى الفشل", rest: "60 ثانية" },
    ],
  },
  "2": {
    title: "تمرين الكارديو",
    duration: "30 دقيقة",
    calories: 250,
    exercises: [
      { name: "جري على السير", sets: 1, reps: "10 دقائق", rest: "-" },
      { name: "تمرين بيربي", sets: 4, reps: "10", rest: "45 ثانية" },
      { name: "قفز الحبل", sets: 3, reps: "دقيقتان", rest: "30 ثانية" },
      { name: "ماونتن كلايمبر", sets: 3, reps: "20", rest: "30 ثانية" },
    ],
  },
};

const WorkoutView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workoutData[id || "1"] || workoutData["1"];

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
          <ExerciseCard key={i} exercise={exercise} index={i} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default WorkoutView;
