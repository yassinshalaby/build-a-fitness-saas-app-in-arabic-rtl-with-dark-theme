import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { useExternalExercises, useExerciseMuscles } from "@/hooks/useExternalExercises";
import { Search, Filter, Dumbbell } from "lucide-react";
import { Input } from "@/components/ui/input";

const muscleTranslations: Record<string, string> = {
  "Chest": "صدر",
  "Back (Lats)": "ظهر (عريضة)",
  "Back (Upper Back)": "ظهر علوي",
  "Back (Traps)": "ظهر (ترابيز)",
  "Shoulders": "أكتاف",
  "Arms (Biceps)": "ذراع (بايسبس)",
  "Arms (Triceps)": "ذراع (ترايسبس)",
  "Legs (Quads)": "أرجل (أمامية)",
  "Legs (Hamstrings)": "أرجل (خلفية)",
  "Legs (Glutes)": "أرجل (مؤخرة)",
  "Legs (Calves)": "أرجل (سمانة)",
  "Core": "بطن",
  "Full Body": "جسم كامل",
  "Cardio": "كارديو",
};

const typeTranslations: Record<string, string> = {
  "push": "دفع",
  "pull": "سحب",
  "legs": "أرجل",
  "core": "بطن",
  "cardio": "كارديو",
};

const ExerciseLibrary = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: muscles, isLoading: musclesLoading } = useExerciseMuscles();
  const { data: exercises, isLoading } = useExternalExercises(selectedMuscle);

  const filtered = exercises
    ?.filter((e) => e.gif_url && e.gif_url.endsWith(".mp4"))
    ?.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="p-6 pt-12">
        <h1 className="text-2xl font-bold text-foreground">مكتبة التمارين</h1>
        <p className="text-sm text-muted-foreground">اكتشف تمارين جديدة لتطوير أدائك</p>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن تمرين..."
            className="pr-10"
          />
        </div>
      </div>

      {/* Muscle Filter */}
      <div className="px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedMuscle(undefined)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-sm transition-all ${
              !selectedMuscle
                ? "gradient-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            الكل
          </button>
          {muscles?.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMuscle(m)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm transition-all ${
                selectedMuscle === m
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {muscleTranslations[m] || m}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="px-4">
        {isLoading || musclesLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 animate-pulse h-24" />
            ))}
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((exercise, i) => (
              <div
                key={exercise.id}
                className="bg-card border border-border rounded-xl p-4 flex gap-4 items-center hover:border-primary/50 transition-all animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <video
                  src={exercise.gif_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-16 h-16 rounded-lg object-cover bg-secondary shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm truncate">{exercise.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {muscleTranslations[exercise.muscle] || exercise.muscle}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {typeTranslations[exercise.type] || exercise.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Dumbbell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>لا توجد تمارين</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ExerciseLibrary;
